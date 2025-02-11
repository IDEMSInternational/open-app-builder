import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  signal,
  ViewChild,
} from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { TemplateAssetService } from "../../services/template-asset.service";
import { getParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import Map from "ol/Map";
import View from "ol/View";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import HeatmapLayer from "ol/layer/Heatmap";
import GeoJSON from "ol/format/GeoJSON";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Icon from "ol/style/Icon";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import chroma from "chroma-js";
import BaseLayer from "ol/layer/Base";
import { Feature } from "ol";
import { ChangeContext, Options } from "@angular-slider/ngx-slider";

interface IMapLayer {
  id: string;
  name: string;
  description: string;
  /** the path to the GeoJSON file containing the data to be plotted */
  source_asset: string | any;
  point_radius_max: number;
  point_radius_property: string;
  point_radius_property_max: number;
  point_icon_asset: string;
  point_icon_excluded_asset: string;
  blur: number;
  fill: string;
  opacity: number;
  /** a property of the dataset to be plotted */
  property: string;
  gradient_palette: string[];
  scale_max: number;
  scale_min: number;
  /** If two layers have the same scale ID, only one scale will be displayed */
  scale_id: string;
  /** The size of the steps on the scale */
  scale_increment: number;
  scale_slider_snap: boolean;
  scale_bins: number[];
  scale_slider: boolean;
  /** Colour to set those features outside of slider range. Default is to set them to be hidden */
  excluded_features_colour: string;
  scale_title: string;
  stroke: string;
  type: "vector" | "heatmap";
  visible_default: boolean;
  layer_group?: string;
}

const DEFAULT_LAYER_GROUP_ID = "default";

type IControlsStyleType = "dropdown" | "list";

interface IMapLayerGroup {
  id: string;
  name?: string;
  controls_style?: IControlsStyleType;
  display_order?: number;
  single_selection?: boolean;
  description?: string;
  layers_data?: IMapLayer[] | string;
  layers?: BaseLayer[];
}

interface IMapParams {
  /**
   * TEMPLATE PARAMETER: extent.
   * Optional. The extent of the map to be displayed, i.e. the boundaries of the visible map, in EPSG:3857 co-ordinates
   */
  extent: number[];
  /**
   * TEMPLATE PARAMETER: layers.
   * A data list or data list name containing a list of layers to be added to the map. Format IMapLayer.
   * Should not be used in conjuction with layer_groups
   */
  layers: IMapLayer[];
  /**
   * TEMPLATE PARAMETER: layer_groups.
   * A data list or data list name containing a list of layer groups to be added to the map. Format IMapLayerGroup.
   * Should not be used in conjuction with layers
   */
  layerGroups: IMapLayerGroup[];
  /**
   * TEMPLATE PARAMETER: controls_style
   * The style in which to display the list of viewable layers. Default "dropdown".
   */
  controlsStyle: "dropdown" | "list";
}

@Component({
  selector: "plh-map",
  styleUrls: ["./map.component.scss"],
  templateUrl: "./map.component.html",
})
export class TmplMapComponent extends TemplateBaseComponent implements AfterViewInit {
  public params: Partial<IMapParams> = {};
  public map: Map;
  public mapLayers: BaseLayer[] = [];
  public mapLayerGroups: IMapLayerGroup[] = [];
  /** Track which scale IDs have already been added to avoid duplicates */
  public visibleScaleIds = signal([]);
  /**
   * The current values of the slider for each scale, indexed by scale ID (if specified) else layer ID
   * TODO: Render a single slider for each group of scale IDs, rather than swapping between sliders for different layers
   * TOD: Integrate signals
   * */
  public sliderValues = {};
  /** Track whether an layer is "loading", i.e. a calculation is in progress on its features */
  layerLoading = signal(true);

  get mapLayerGroupsSorted() {
    return this.mapLayerGroups.sort((a, b) => b.display_order - a.display_order);
  }
  @ViewChild("mapElement") mapElement!: ElementRef<HTMLElement>;

  constructor(
    private templateAssetService: TemplateAssetService,
    private appDataService: AppDataService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    // HACK: ensure that exactly one scale is visible for each group of scale IDs
    // TODO: should be handled by single a top-level slider for the whole grouop,
    // rather than one associated with a specific layer
    effect(
      () => {
        const visibleScaleIds = this.visibleScaleIds();
        const allLayers = this.getAllLayers();
        for (const id of visibleScaleIds) {
          const layersWithScaleId = allLayers.filter((l) => l?.get("scaleId") === id);
          let firstVisibleLayerFound = false;
          layersWithScaleId.forEach((layer) => {
            if (layer.getVisible() === true && !firstVisibleLayerFound) {
              const scaleAlreadyVisible = layer.get("showScale");
              layer.set("showScale", true);
              if (!scaleAlreadyVisible) {
                this.handleSliderChange(layer);
              }
              firstVisibleLayerFound = true;
            } else {
              layer.set("showScale", false);
            }
          });
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit() {
    this.init();
  }

  private async init() {
    await this.getParams();
    await this.initialiseMap();
    if (this.params.layerGroups) {
      for (const layerGroup of this.params.layerGroups) {
        this.addLayerGroupLayers(layerGroup);
      }
    } else if (this.params.layers) {
      this.addLayers(this.params.layers);
    }
  }

  public handleToggleChange(event: any, mapLayer: BaseLayer) {
    const toggleValue = event.detail.checked;
    this.setLayerVisibility(mapLayer, toggleValue);
  }

  private setLayerVisibility(mapLayer: BaseLayer, value: boolean) {
    if (mapLayer.getVisible() === value) return;

    const scaleId = mapLayer.get("scaleId");

    if (scaleId) {
      if (value) {
        if (!this.visibleScaleIds().includes(scaleId)) {
          this.visibleScaleIds.set([...this.visibleScaleIds(), scaleId]);
        }
        this.handleSliderChange(mapLayer);
      } else {
        // Check if any other layer with the same scaleId is still visible
        const allLayers = this.getAllLayers();
        const scaleIdHasOtherVisibleLayer = allLayers.some((l) => {
          return (
            l?.get("scaleId") === scaleId && l?.getVisible() && l?.get("id") !== mapLayer?.get("id")
          );
        });
        // and if not, remove ID from list
        if (!scaleIdHasOtherVisibleLayer) {
          this.visibleScaleIds.set(this.visibleScaleIds().filter((id) => id !== scaleId));
        } else {
          // HACK: Trigger side effects withoout changing value
          const scaleIds = this.visibleScaleIds();
          this.visibleScaleIds.set([]);
          this.visibleScaleIds.set(scaleIds);
        }
      }
    }
    mapLayer.setVisible(value);
  }

  private getAllLayers() {
    return this.mapLayerGroups.map((group) => group.layers).flat();
  }

  private shouldShowLayerScale(layer: BaseLayer) {
    // If no gradient is specified, there is no scale to show
    if (!layer.get("gradientFill")) return false;
    // Layers with a specified scale ID have there visibility managed by computed property
    if (layer.get("scaleId")) return false;
    return true;
  }

  public getVisibleLayerNames(layerGroup: string) {
    const groupLayers = this.mapLayerGroups.find((group) => group.id === layerGroup)?.layers;
    return groupLayers.filter((layer) => layer.getVisible()).map((layer) => layer.get("name"));
  }

  /**
   * Handles the change event from a slider component and updates the visibility of features
   * in a vector map layer based on the selected range values.
   * TODO: Integrate signals to track slider values rather than calling this method explicitly
   */
  public handleSliderChange(mapLayer: BaseLayer, event?: ChangeContext) {
    const scaleId = mapLayer.get("scaleId") || mapLayer.get("id");
    if (!this.sliderValues[scaleId]) return;
    const { min: lower, max: upper } = this.sliderValues[scaleId];

    // Only works on vector layers
    const triggerLayer = mapLayer as VectorLayer;

    // HACK: scale slider values are applied to all visible layers with the same scaleId
    if (triggerLayer.get("scaleId")) {
      const layersWithSameScaleId = this.getAllLayers().filter(
        (l) => l?.get("scaleId") === triggerLayer.get("scaleId")
      );
      for (const layer of layersWithSameScaleId) {
        this.filterLayerFeatures(layer as VectorLayer, upper, lower);
      }
    } else {
      this.filterLayerFeatures(triggerLayer, upper, lower);
    }
  }

  private filterLayerFeatures(vectorLayer: VectorLayer, upperValue: number, lowerValue: number) {
    lowerValue = this.roundToXDecimalPlace(lowerValue, 1);
    upperValue = this.roundToXDecimalPlace(upperValue, 1);
    const propertyName = vectorLayer.get("propertyToPlot");
    const filterFeatures = (feature: Feature) => {
      const value = feature.get(propertyName);
      return value >= lowerValue && value <= upperValue;
    };
    const excludedFeaturesColour = vectorLayer.get("excludedFeaturesColour");
    const pointIconAsset = vectorLayer.get("pointIconAsset");

    const applyFiltering = (source: VectorSource) => {
      if (!this.layerLoading()) {
        this.layerLoading.set(true);
      }
      try {
        source.forEachFeature((feature: Feature) => {
          // Do not set visibility of excluded features if an excluded colour is provided, or if using point icons
          if (excludedFeaturesColour || pointIconAsset) {
            feature.set("isExcludedFromFilter", !filterFeatures(feature));
          } else {
            feature.set("visible", filterFeatures(feature));
          }
        });
      } catch (e) {
        throw e;
      } finally {
        this.layerLoading.set(false);
      }
    };

    const source = vectorLayer.getSource();
    if (source.getFeatures().length > 0) {
      applyFiltering(source);
    }
    // HACK: await to see if source is still loading (couldn't get `source.once('featuresloadend')` to work)
    else {
      setTimeout(() => {
        applyFiltering(vectorLayer.getSource());
      }, 200);
    }
  }

  public handleDropdownChange(event: any, layerGroupId?: string) {
    this.makeLayersVisible(event.detail.value, layerGroupId);
  }

  private makeLayersVisible(layers: string[], layerGroupId?: string) {
    if (layerGroupId) {
      const layerGroup = this.mapLayerGroups.find((group) => group.id === layerGroupId);
      layerGroup.layers.forEach((layer) => {
        this.setLayerVisibility(layer, layers.includes(layer.get("name")));
      });
      return;
    } else {
      for (const layerGroup of this.mapLayerGroups) {
        layerGroup.layers.forEach((layer) => {
          this.setLayerVisibility(layer, layers.includes(layer.get("name")));
        });
      }
    }
  }

  public getSliderOptions(mapLayer: any) {
    const sliderOptions: Options = {
      disabled: !mapLayer.get("scaleSlider"),
      floor: mapLayer.get("scaleMin"),
      ceil: mapLayer.get("scaleMax"),
      // Default to no ticks (1 big one)
      tickStep: mapLayer.get("scaleIncrement") || mapLayer.get("scaleMax"),
      step: mapLayer.get("scaleIncrement") || mapLayer.get("scaleMax") / 1000,
      showTicks: !mapLayer.get("scaleSlider") || !!mapLayer.get("scaleIncrement"),
      showTicksValues: !mapLayer.get("scaleSlider") || !!mapLayer.get("scaleIncrement"),
      // Convert tooltip value to display max of 2 decimal places
      translate: (value: number) => {
        return new Intl.NumberFormat("en-GB", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        }).format(value);
      },
      vertical: true,
    };
    return sliderOptions;
  }

  private roundToXDecimalPlace(value: number, decimalPlaces: number = 1) {
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
  }

  private async initialiseMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        extent: this.params.extent,
        showFullExtent: true,
        zoom: 2,
        maxZoom: 18,
      }),
    });

    this.map.setTarget(this.mapElement.nativeElement);
  }

  private async getParams() {
    // Use layer_groups if provided, otherwise use layers
    const layerGroupsReference = getParamFromTemplateRow(this._row, "layer_groups", null);
    if (layerGroupsReference) {
      this.params.layerGroups = await this.getDataListFromReferenceParam(layerGroupsReference);
      for (const layerGroup of this.params.layerGroups) {
        layerGroup.layers_data = await this.getDataListFromReferenceParam(layerGroup.layers_data);
      }
      this.mapLayerGroups = this.params.layerGroups.map((layerGroup) => {
        layerGroup.layers_data = (layerGroup.layers_data as IMapLayer[]).map((layer) =>
          this.parseLayerParams(layer)
        );
        return layerGroup;
      });
    } else {
      const layersReference = getParamFromTemplateRow(this._row, "layers", null);
      if (layersReference) {
        const layersData = await this.getDataListFromReferenceParam(layersReference);
        this.params.layers = layersData.map((layer) => this.parseLayerParams(layer));
      }
      this.mapLayerGroups = [
        {
          id: DEFAULT_LAYER_GROUP_ID,
          layers_data: this.params.layers,
          layers: [],
        },
      ];
    }

    const extentRaw = getStringParamFromTemplateRow(this._row, "extent", null);
    if (extentRaw) {
      this.params.extent = extentRaw.split(",").map((num) => parseFloat(num.trim()));
    }

    this.params.controlsStyle = getStringParamFromTemplateRow(
      this._row,
      "controls_style",
      "dropdown"
    ) as IMapParams["controlsStyle"];
  }

  private async getDataListFromReferenceParam(dataListReference: any) {
    if (!dataListReference) return [];
    let rows: any[] = [];
    // If raw value is a string, assume it is a data list name and fetch the associated data
    if (typeof dataListReference === "string") {
      const dataList = await this.appDataService.getSheet("data_list", dataListReference);
      rows = dataList?.rows || [];
    }
    // Else assume it is a parsed data list, as passed by e.g. @data.my_map_data_list
    else {
      rows = Object.values(dataListReference);
    }
    return rows;
  }

  private parseLayerParams(layer: any) {
    layer.source_asset = this.templateAssetService.getTranslatedAssetPath(layer.source_asset);
    layer.blur = Number(layer.blur);
    layer.point_icon_asset = this.templateAssetService.getTranslatedAssetPath(
      layer.point_icon_asset
    );
    layer.point_icon_excluded_asset = this.templateAssetService.getTranslatedAssetPath(
      layer.point_icon_excluded_asset
    );
    layer.point_radius_max = Number(layer.point_radius_max);
    layer.point_radius_property_max = Number(layer.point_radius_property_max);
    layer.scale_bins = layer.scale_bins?.split(", ").map(Number);
    layer.gradient_palette = layer.gradient_palette?.split(",").map((str) => str.trim());
    return layer;
  }

  private addLayerGroupLayers(layerGroup: IMapLayerGroup) {
    if (layerGroup.layers_data) {
      this.addLayers(layerGroup.layers_data as IMapLayer[], layerGroup.id);
    }
  }

  private addLayers(layers: IMapLayer[], layerGroup?: string) {
    for (const layer of layers) {
      switch (layer.type) {
        case "vector":
          this.addVectorLayer(layer, layerGroup);
          break;
        case "heatmap":
          this.addHeatmapLayer(layer, layerGroup);
          break;
        default:
          console.warn(`[MAP] Unknown layer type for ${layer.name}: ${layer.type}`);
      }
    }
    this.layerLoading.set(false);
  }

  private addHeatmapLayer(layer: IMapLayer, layerGroup?: string) {
    if (!layer) return;
    const {
      id,
      description,
      name,
      blur,
      point_radius_max,
      opacity,
      property: propertyToPlot,
      gradient_palette,
      scale_id,
      scale_max,
      scale_min,
      scale_increment,
      scale_slider_snap,
      scale_bins,
      scale_title,
      source_asset,
      visible_default,
    } = layer;
    if (!source_asset) return;

    const heatmapLayer = new HeatmapLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: source_asset,
      }),
      blur: blur || blur === 0 ? blur : 8,
      radius: point_radius_max || 12,
      weight: (feature) => {
        const value = feature.get(propertyToPlot);
        const normalisedValue = (value - scale_min) / (scale_max - scale_min);
        return scale_bins ? this.mapValueToBin(normalisedValue, scale_bins) : normalisedValue;
      },
    });

    // Set custom gradient palette if specified, otherwise openLayers' default will be used
    if (gradient_palette) {
      heatmapLayer.setGradient(gradient_palette);
    }

    this.setCustomLayerProperties(heatmapLayer, {
      id,
      visible: visible_default,
      name,
      description,
      opacity,
      propertyToPlot,
      scaleMax: scale_max,
      scaleMin: scale_min,
      scaleId: scale_id,
      scaleIncrement: scale_increment,
      scaleSliderSnap: scale_slider_snap,
      scaleTitle: scale_title,
      scaleColours: gradient_palette,
    });
    this.addLayer(heatmapLayer, layerGroup);
  }
  private addVectorLayer(layer: IMapLayer, layerGroup?: string) {
    if (!layer) return;
    const {
      id,
      description,
      fill,
      name,
      opacity,
      property: propertyToPlot,
      gradient_palette,
      scale_max,
      scale_min,
      scale_id,
      scale_increment,
      scale_slider_snap,
      scale_title,
      source_asset,
      stroke,
      visible_default,
      point_icon_asset,
      point_icon_excluded_asset,
      point_radius_max,
      point_radius_property,
      point_radius_property_max,
      scale_slider,
      excluded_features_colour,
    } = layer;
    if (!source_asset) return;

    let scaleColours, colourScale;
    if (propertyToPlot) {
      colourScale = this.generateColourScale(scale_max, scale_min, gradient_palette);
      const equidistantScaleColours = colourScale.colors(5);
      scaleColours = equidistantScaleColours;
    }
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: source_asset,
      }),
      style: (feature) => {
        if (feature.get("visible") === false) return null;

        const geometryType = feature.getGeometry().getType();
        const isExcludedFromFilter = feature.get("isExcludedFromFilter");
        if (geometryType === "Polygon" || geometryType === "MultiPolygon") {
          if (isExcludedFromFilter) {
            return new Style({
              fill: new Fill({
                color: excluded_features_colour,
              }),
            });
          }
          if (propertyToPlot) {
            const value = feature.get(propertyToPlot);
            return new Style({
              fill: new Fill({
                color: this.getColourForValue(colourScale, value),
              }),
              stroke: new Stroke({
                color: stroke && stroke !== "none" ? stroke : "transparent",
                width: 1,
              }),
            });
          } else {
            return new Style({
              fill: new Fill({
                color: fill && fill !== "none" ? fill : "transparent",
              }),
              stroke: new Stroke({
                color: stroke && stroke !== "none" ? stroke : "transparent",
                width: 1,
              }),
            });
          }
        }

        if (geometryType === "LineString") {
          if (isExcludedFromFilter) {
            return new Style({
              stroke: new Stroke({
                color: excluded_features_colour,
                width: 2,
              }),
            });
          }
          return new Style({
            stroke: new Stroke({
              color: stroke && stroke !== "none" ? stroke : "transparent",
              width: 2,
            }),
          });
        }

        if (geometryType === "Point") {
          const radius = point_radius_property
            ? this.calcPointRadius(
                feature.get(point_radius_property),
                point_radius_property_max,
                point_radius_max
              )
            : 2;

          let style: Style;

          if (point_icon_asset) {
            style = new Style({
              image: new Icon({
                src:
                  isExcludedFromFilter && point_icon_excluded_asset
                    ? point_icon_excluded_asset
                    : point_icon_asset,
                anchor: [0.5, 0.5], // Anchor at centre of icon
                opacity: isExcludedFromFilter && !point_icon_excluded_asset ? 0.3 : 1,
              }),
            });
          } else {
            if (isExcludedFromFilter) {
              style = new Style({
                image: new CircleStyle({
                  radius,
                  fill: new Fill({
                    color: excluded_features_colour,
                  }),
                  stroke: new Stroke({
                    color: "transparent",
                    width: 0,
                  }),
                }),
              });
            } else {
              style = new Style({
                image: new CircleStyle({
                  radius,
                  fill: new Fill({
                    color: fill && fill !== "none" ? fill : "transparent",
                  }),
                  stroke: new Stroke({
                    color: stroke === "none" ? "transparent" : stroke || "black",
                    width: 1,
                  }),
                }),
              });
            }
          }
          return style;
        }
      },
    });

    this.setCustomLayerProperties(vectorLayer, {
      id,
      visible: visible_default,
      name,
      description,
      scaleMax: scale_max,
      scaleMin: scale_min,
      scaleId: scale_id,
      scaleIncrement: scale_increment,
      scaleSliderSnap: scale_slider_snap,
      scaleTitle: scale_title,
      scaleColours,
      scaleSlider: scale_slider,
      opacity,
      propertyToPlot,
      excludedFeaturesColour: excluded_features_colour,
      pointIconAsset: point_icon_asset,
    });
    this.addLayer(vectorLayer, layerGroup);
  }

  private mapValueToBin(value, bins: number[]) {
    const numBins = bins.length - 1;
    if (value <= bins[0]) {
      return 0;
    }
    if (value >= bins[numBins]) {
      return 1;
    }
    // Find which bin the value falls into
    for (let i = 0; i < numBins; i++) {
      if (value >= bins[i] && value < bins[i + 1]) {
        // Normalize the value within the bin
        return ((value - bins[i]) / (bins[i + 1] - bins[i])) * (1 / numBins) + i / numBins;
      }
    }
    // Fallback for inconsistent data
    return 0;
  }

  private addLayer(layer: BaseLayer, layerGroupId: string = DEFAULT_LAYER_GROUP_ID) {
    this.map.addLayer(layer);
    const targetGroup = this.mapLayerGroups.find((group) => group.id === layerGroupId);
    targetGroup.layers ??= [];
    targetGroup.layers.push(layer);
    const scaleId = layer.get("scaleId") || layer.get("id");
    this.sliderValues[scaleId] = {
      min: layer.get("scaleMin") || 0,
      max: layer.get("scaleMax") || 0,
    };
    this.setLayerVisibility(
      layer,
      layer.get("visibleDefault") === undefined || !!layer.get("visibleDefault")
    );
    this.cdr.markForCheck();
  }

  private setCustomLayerProperties(
    layer: BaseLayer,
    setCustomLayerProperties: {
      id?: string;
      visible?: boolean;
      name: string;
      description?: string;
      scaleMax?: number;
      scaleMin?: number;
      scaleId?: string;
      scaleIncrement?: number;
      scaleSliderSnap?: boolean;
      scaleTitle?: string;
      scaleColours?: string[];
      scaleSlider?: boolean;
      opacity?: number;
      propertyToPlot?: string;
      excludedFeaturesColour?: string;
      pointIconAsset?: string;
    }
  ) {
    const {
      id,
      visible,
      name,
      description,
      scaleMax,
      scaleMin,
      scaleId,
      scaleIncrement,
      scaleSliderSnap,
      scaleTitle,
      scaleColours,
      scaleSlider,
      opacity,
      propertyToPlot,
      excludedFeaturesColour,
      pointIconAsset,
    } = setCustomLayerProperties;

    const cssGradientFill = scaleColours
      ? `linear-gradient(0deg, ${scaleColours.join(", ")})`
      : undefined;
    if (opacity || opacity === 0) layer.setOpacity(opacity);
    layer.set("id", id);
    layer.set("name", name);
    layer.set("description", description);
    layer.set("gradientFill", cssGradientFill);
    layer.set("scaleMax", scaleMax);
    layer.set("scaleMin", scaleMin);
    layer.set("scaleId", scaleId);
    layer.set("scaleIncrement", scaleIncrement);
    layer.set("scaleSliderSnap", scaleSliderSnap);
    layer.set("scaleTitle", scaleTitle);
    layer.set("scaleSlider", scaleSlider);
    layer.set("excludedFeaturesColour", excludedFeaturesColour);
    layer.set("pointIconAsset", pointIconAsset);
    layer.set("propertyToPlot", propertyToPlot);
    layer.set("visibleDefault", visible);

    layer.set("showScale", this.shouldShowLayerScale(layer));
    // Override default visibility, "true"
    layer.setVisible(false);
  }

  private calcPointRadius(value: number, maxvalue: number, maxRadius: number) {
    if (value <= 0 || maxvalue <= 0) {
      return 0;
    }

    const ratio = value / maxvalue;
    return Math.min(ratio * maxRadius, maxRadius);
  }

  private generateColourScale(
    scaleMax: number = 100,
    scaleMin: number = 0,
    scaleColors = ["black", "white"]
  ) {
    return chroma.scale(scaleColors).domain([scaleMin, scaleMax]).mode("hsl");
    // .gamma(1)
    // .correctLightness()
  }
  private getColourForValue(colourScale: chroma.Scale, value: number) {
    return colourScale(value).css();
  }
}
