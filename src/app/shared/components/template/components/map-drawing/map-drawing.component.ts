import { Component, inject, OnInit, signal } from "@angular/core";
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

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  data_list: coerce.string(""),
  geometry_field_name: coerce.string("geometry"),
  properties_field_name: coerce.string("properties"),
}));

@Component({
  selector: "oab-map-drawing",
  templateUrl: "./map-drawing.component.html",
  styleUrls: ["./map-drawing.component.scss"],
  standalone: false,
  host: {
    "(document:keydown.escape)": "cancelPolygon()",
  },
})
export class MapDrawingComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements OnInit
{
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

  public ngOnInit(): void {
    // a single tile layer with a swappable source keeps its canvas in a fixed DOM position so
    // TerraDraw's vector layer (added after) reliably stays on top and clickable
    this.baseLayer = new TileLayer({
      source: this.streetSource,
    });

    const map = new Map({
      layers: [this.baseLayer],
      target: "map",
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
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
    if (features.length === 0) return;

    const rows = features.map((feature) => ({
      id: String(feature.id),
      [geometryFieldName]: feature.geometry,
      [propertiesFieldName]: feature.properties,
    }));

    try {
      await this.dynamicDataService.bulkUpsert("data_list", dataList, rows as any);
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
