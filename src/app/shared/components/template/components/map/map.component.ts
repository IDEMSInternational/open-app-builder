import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
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
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";

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
  implements AfterViewInit
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

  public ngAfterViewInit(): void {
    this.initMap();
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
    const dataList = this.params().dataList;

    if (!dataList || !this.terraDraw) return;

    const geometryFieldName = this.params().geometryFieldName;
    const propertiesFieldName = this.params().propertiesFieldName;

    const features = this.terraDraw?.getSnapshot() ?? [];
    const rows = features.map((feature) => ({
      id: String(feature.id),
      [geometryFieldName]: feature.geometry,
      [propertiesFieldName]: feature.properties,
    }));
    const existingRows = (await this.dynamicDataService.snapshot(
      "data_list",
      dataList
    )) as StoredFeatureRow[];
    const rowsToRemove = existingRows.filter(
      (row) => !rows.some((featureRow) => featureRow.id === row.id)
    );

    try {
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
      const rows = await this.dynamicDataService.snapshot("data_list", dataList);
      const features = rows
        .filter((row: any) => row[geometryFieldName])
        .map((row: any) => ({
          type: "Feature" as const,
          id: row.id,
          geometry: row[geometryFieldName],
          properties: row[propertiesFieldName] ?? {},
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
    } catch (error) {
      console.error(`[MapDrawingComponent] Failed to load drawn features:`, error);
    }
  }

  private setMode(mode: MapDrawingMode) {
    this.mode.set(mode);
    this.selectedFeatureId.set(null);
    this.terraDraw?.setMode(mode);
    // disable map panning while actively drawing so drag gestures draw instead of pan the map
    this.dragPan?.setActive(mode !== "polygon");
  }
}
