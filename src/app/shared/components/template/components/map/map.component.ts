import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  OnDestroy,
  signal,
  untracked,
  AfterViewInit,
} from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { TerraDraw, TerraDrawPolygonMode, TerraDrawSelectMode } from "terra-draw";
import { TerraDrawOpenLayersAdapter } from "terra-draw-openlayers-adapter";

import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { DragPan } from "ol/interaction";
import { Circle, Icon, Stroke, Style, Fill } from "ol/style";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat, getUserProjection, Projection, toLonLat } from "ol/proj";
import { boundingExtent, isEmpty as isEmptyExtent } from "ol/extent";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { toMapPolygon } from "./map-geometry.utils";
import { ItemDataPipe } from "../../processors/itemPipe";

type MapDrawingMode = "static" | "polygon" | "select";
type FeatureId = ReturnType<TerraDraw["getFeatureId"]>;
type StoredFeatureRow = {
  id: string;
  [key: string]: unknown;
};

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  data_list: coerce.string(""),
  geometry_field_name: coerce.string("geometry"),
  properties_field_name: coerce.string("properties"),
  center_lon: coerce.number(0),
  center_lat: coerce.number(0),
  zoom: coerce.number(2),
  /** Closest zoom used when framing the loaded shapes. Set `0` to keep the authored `zoom` */
  max_fit_zoom: coerce.number(18),
  /** When false, data list geometries are only displayed (no drawing, editing or saving) */
  editable: coerce.boolean(true),
  /**
   * Expression limiting which data list rows the map uses, as per data_items,
   * e.g. `@item.upa_code == @local.upa_code`
   */
  filter: coerce.string(""),
  /**
   * Columns written to every saved row, so drawn features still satisfy `filter` when reloaded,
   * e.g. `upa_code=@local.upa_code, annee=@local.annee_choisie`. Uses `=` rather than `:` as
   * parameter_list values are truncated at their second colon
   */
  save_values: coerce.string(""),
}));

@Component({
  selector: "oab-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  standalone: false,
  host: {
    "(document:keydown.escape)": "handleKeydown($event)",
    "(document:keydown.delete)": "handleKeydown($event)",
  },
})
export class MapComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements AfterViewInit, OnDestroy
{
  private hostElement = inject(ElementRef<HTMLElement>);
  private dynamicDataService = inject(DynamicDataService);

  private terraDraw: TerraDraw | null = null;
  private map: Map | null = null;
  private dragPan: DragPan | null = null;
  private baseLayer: TileLayer | null = null;
  private streetSource = new OSM();
  private satelliteSource = new XYZ({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attributions: "Tiles © Esri",
    maxZoom: 19,
  });

  public mode = signal<MapDrawingMode>("static");
  public selectedFeatureId = signal<FeatureId | null>(null);
  public locating = signal(false);
  public satellite = signal(false);
  public readonly mapId = `map-${crypto.randomUUID()}`;

  /** Layer holding view-only geometries, replaced whenever the filtered rows change */
  private readOnlyLayer: VectorLayer | null = null;
  /** Incremented per view-only load so a slower earlier load cannot overwrite a later one */
  private readOnlyLoadId = 0;

  constructor() {
    super();
    // Reload when author parameters change, e.g. a `filter` referencing a @local variable that the
    // user has just updated. Only view-only maps reload: re-running an editable map would discard
    // any features drawn but not yet saved
    effect(() => {
      // reading params() tracks every author parameter, so any change triggers a reload
      const { editable, filter } = this.params();
      if (editable || !filter) return;
      const map = this.map;
      if (map) untracked(() => this.loadReadOnly(map));
    });
  }

  public ngAfterViewInit(): void {
    this.initMap();
  }

  public ngOnDestroy(): void {
    this.terraDraw?.stop();
    this.map?.dispose();
    this.terraDraw = null;
    this.map = null;
    this.readOnlyLayer = null;
  }

  public initMap() {
    // a single tile layer with a swappable source keeps its canvas in a fixed DOM position so
    // TerraDraw's vector layer (added after) reliably stays on top and clickable
    this.baseLayer = new TileLayer({
      source: this.streetSource,
    });

    const map = new Map({
      layers: [this.baseLayer],
      target: this.mapId,
      view: new View({
        center: fromLonLat([this.params().centerLon, this.params().centerLat]),
        zoom: this.params().zoom,
      }),
      controls: [],
    });
    this.map = map;

    map.getInteractions().forEach((interaction) => {
      if (interaction instanceof DragPan) {
        this.dragPan = interaction;
      }
    });

    if (!this.params().editable) {
      this.loadReadOnly(map);
      return;
    }

    const adapter = new TerraDrawOpenLayersAdapter({
      lib: {
        Feature,
        GeoJSON,
        Style,
        Stroke,
        Fill,
        Circle,
        Icon,
        VectorLayer,
        VectorSource,
        Projection,
        getUserProjection,
        fromLonLat,
        toLonLat,
      },
      map,
      coordinatePrecision: 9,
    });

    this.terraDraw = new TerraDraw({
      adapter,
      modes: [
        new TerraDrawPolygonMode(),
        new TerraDrawSelectMode({
          flags: {
            polygon: {
              feature: {
                draggable: true,
                coordinates: {
                  midpoints: true,
                  draggable: true,
                  deletable: true,
                },
              },
            },
          },
        }),
      ],
    });

    this.terraDraw.on("select", (id) => this.selectedFeatureId.set(id));
    this.terraDraw.on("deselect", () => this.selectedFeatureId.set(null));

    map.once("rendercomplete", () => {
      this.terraDraw?.start();
      this.load();
    });
  }

  public togglePolygon() {
    this.setMode(this.mode() === "polygon" ? "static" : "polygon");
  }

  public cancelPolygon() {
    // switching away from polygon mode discards any in-progress (unfinished) drawing
    if (this.mode() === "polygon") {
      this.setMode("static");
    }
  }

  public handleKeydown(event: Event) {
    if (!(event instanceof KeyboardEvent)) return;

    const target = event.target;
    const isEditableTarget =
      target instanceof HTMLElement &&
      target.closest("input, textarea, select, [contenteditable='true']") !== null;
    const mapHasFocus = this.hostElement.nativeElement.contains(document.activeElement);

    if (isEditableTarget || !mapHasFocus) return;

    event.preventDefault();
    if (event.key === "Escape") {
      this.cancelPolygon();
    } else if (event.key === "Delete") {
      this.deleteSelected();
    }
  }

  public focusMap() {
    (this.hostElement.nativeElement.querySelector(".map-container") as HTMLElement | null)?.focus();
  }

  public toggleSelect() {
    this.setMode(this.mode() === "select" ? "static" : "select");
  }

  public deleteSelected() {
    const id = this.selectedFeatureId();
    if (id === null) return;
    this.terraDraw?.removeFeatures([id]);
    this.selectedFeatureId.set(null);
  }

  public locateMe() {
    if (!navigator.geolocation || this.locating()) return;
    this.locating.set(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.locating.set(false);
        const center = fromLonLat([position.coords.longitude, position.coords.latitude]);
        this.map?.getView().animate({ center, zoom: 16, duration: 500 });
      },
      () => this.locating.set(false),
      { enableHighAccuracy: true }
    );
  }

  public toggleSatellite() {
    const satellite = !this.satellite();
    this.satellite.set(satellite);
    this.baseLayer?.setSource(satellite ? this.satelliteSource : this.streetSource);
  }

  public async save() {
    try {
      const dataList = this.params().dataList;

      if (!dataList || !this.terraDraw) return;

      const geometryFieldName = this.params().geometryFieldName;
      const propertiesFieldName = this.params().propertiesFieldName;

      const features = this.terraDraw?.getSnapshot() ?? [];
      const savedValues = this.parseSaveValues();
      const rows = features.map((feature) => ({
        ...savedValues,
        id: String(feature.id),
        [geometryFieldName]: feature.geometry,
        [propertiesFieldName]: feature.properties,
      }));
      // only consider rows the map loaded; filtered-out rows are not shown and must not be removed
      const existingRows = this.applyFilter(
        (await this.dynamicDataService.snapshot("data_list", dataList)) as StoredFeatureRow[]
      );
      const rowsToRemove = existingRows.filter(
        (row) => row[geometryFieldName] && !rows.some((featureRow) => featureRow.id === row.id)
      );

      if (rowsToRemove.length > 0) {
        await this.dynamicDataService.remove(
          "data_list",
          dataList,
          rowsToRemove.map((row) => row.id)
        );
      }

      if (rows.length > 0) {
        await this.dynamicDataService.bulkUpsert("data_list", dataList, rows as any);
      }
    } catch (error) {
      console.error(`[MapDrawingComponent] Failed to save drawn features:`, error);
    }
  }

  private async load() {
    const dataList = this.params().dataList;
    const geometryFieldName = this.params().geometryFieldName;
    const propertiesFieldName = this.params().propertiesFieldName;

    if (!dataList || !this.terraDraw) return;

    try {
      const rows = this.applyFilter(await this.dynamicDataService.snapshot("data_list", dataList));
      const features = rows
        .filter((row: any) => row[geometryFieldName])
        .map((row: any) => ({
          type: "Feature" as const,
          id: row.id,
          geometry: row[geometryFieldName],
          properties:
            row[propertiesFieldName] ?? this.toTerraDrawFeatureProperties(row[geometryFieldName]),
        }));
      if (features.length === 0) return;

      const validations = this.terraDraw.addFeatures(features);
      validations.forEach((validation, index) => {
        if (!validation.valid) {
          console.error(
            `[MapDrawingComponent] Invalid feature '${features[index].id}':`,
            validation.reason
          );
        }
      });

      // zoom to the features that loaded, rather than relying on the authored center and zoom
      const loaded = features.filter((_, index) => validations[index]?.valid !== false);
      const points = loaded.flatMap((feature: any) => feature.geometry?.coordinates?.[0] ?? []);
      if (this.map && points.length > 0) {
        this.fitToExtent(
          this.map,
          boundingExtent(points.map((point: number[]) => fromLonLat([point[0], point[1]])))
        );
      }
    } catch (error) {
      console.error(`[MapDrawingComponent] Failed to load drawn features:`, error);
    }
  }

  /**
   * Display data list geometries as a plain OpenLayers layer. TerraDraw is not used, so authored
   * data (e.g. recorded GPS traces with sheet ids) is shown without its editing constraints
   */
  private async loadReadOnly(map: Map) {
    const dataList = this.params().dataList;
    const geometryFieldName = this.params().geometryFieldName;

    if (!dataList) return;

    const loadId = ++this.readOnlyLoadId;

    try {
      const rows = this.applyFilter(await this.dynamicDataService.snapshot("data_list", dataList));
      // ignore if the map has been destroyed, or another load started, while reading the data
      if (this.map !== map || loadId !== this.readOnlyLoadId) return;

      const features = rows.flatMap((row: any) => {
        const value = row[geometryFieldName];
        if (!value) return [];
        const geometry = toMapPolygon(value);
        if (!geometry) {
          console.warn(`[MapDrawingComponent] Cannot read geometry of '${row.id}':`, value);
          return [];
        }
        return [{ type: "Feature", id: row.id, geometry, properties: {} }];
      });

      // remove previously displayed shapes, so a reload replaces them rather than drawing on top
      if (this.readOnlyLayer) {
        map.removeLayer(this.readOnlyLayer);
        this.readOnlyLayer = null;
      }
      if (features.length === 0) return;

      const source = new VectorSource({
        features: new GeoJSON().readFeatures(
          { type: "FeatureCollection", features },
          { featureProjection: map.getView().getProjection() }
        ),
      });
      this.readOnlyLayer = new VectorLayer({ source, style: this.readOnlyStyle() });
      map.addLayer(this.readOnlyLayer);

      // zoom to the shapes rather than relying on the authored center and zoom
      this.fitToExtent(map, source.getExtent());
    } catch (error) {
      console.error(`[MapDrawingComponent] Failed to load features:`, error);
    }
  }

  /**
   * Zoom the view to an extent, so authored shapes are visible wherever `center_lon`, `center_lat`
   * and `zoom` point. The map has no size until it has rendered, and fitting before then is ignored,
   * so defer to the first render when data arrives first
   */
  private fitToExtent(map: Map, extent: number[]) {
    const maxZoom = this.params().maxFitZoom;
    if (!maxZoom) return;
    if (!extent || isEmptyExtent(extent) || !extent.every((value) => Number.isFinite(value)))
      return;
    const fit = () => map.getView().fit(extent, { padding: [40, 40, 40, 40], maxZoom });
    const size = map.getSize();
    if (size && size[0] > 0 && size[1] > 0) fit();
    else map.once("rendercomplete", fit);
  }

  /**
   * Limit data list rows with the author `filter` expression, using the same pipe as data_items.
   * `@item.*` references arrive as `this.item.*` and all other references already evaluated,
   * e.g. `filter: @item.upa_code == @local.upa_code` -> `this.item.upa_code == "502"`
   */
  private applyFilter<T>(rows: T[]): T[] {
    const filter = this.params().filter;
    if (!filter) return rows;
    return new ItemDataPipe().process(rows, [{ name: "filter", arg: filter }]);
  }

  /**
   * Parse the `save_values` parameter into columns stored on every saved row, so that drawn
   * features still satisfy `filter` when the map is next loaded,
   * e.g. `upa_code=@local.upa_code, annee=2024` -> `{ upa_code: 502, annee: 2024 }`
   */
  private parseSaveValues() {
    const values: Record<string, string | number> = {};
    for (const pair of this.params().saveValues.split(",")) {
      const [name, value] = pair.split("=").map((part) => part.trim());
      if (!name || !value) continue;
      // keep numeric columns numeric, as data list column types come from the sheet
      values[name] = Number.isFinite(Number(value)) ? Number(value) : value;
    }
    return values;
  }

  private readOnlyStyle() {
    const color =
      getComputedStyle(this.hostElement.nativeElement)
        .getPropertyValue("--ion-color-primary")
        .trim() || "#3880ff";
    return new Style({
      stroke: new Stroke({ color, width: 2 }),
      fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" }),
    });
  }

  private setMode(mode: MapDrawingMode) {
    this.mode.set(mode);
    this.selectedFeatureId.set(null);
    this.terraDraw?.setMode(mode);
    // disable map panning while actively drawing so drag gestures draw instead of pan the map
    this.dragPan?.setActive(mode !== "polygon");
  }

  private toTerraDrawFeatureProperties(geojson: any): any {
    if (!geojson || geojson.type !== "Feature") {
      throw new Error("Expected a GeoJSON Feature");
    }

    const geom = geojson.geometry;

    const featureType = this.matchTerraDrawType(geom);

    return {
      featureType,
      ...(geojson.properties ?? {}),
    };
  }

  private matchTerraDrawType(geometry: any): string {
    switch (geometry.type) {
      case "Point":
        return "point";

      case "LineString":
        return "line";

      case "Polygon":
        return "polygon";

      case "MultiPolygon":
        return "multipolygon";

      case "MultiLineString":
        return "multiline";

      case "MultiPoint":
        return "multipoint";

      default:
        return "unknown";
    }
  }
}
