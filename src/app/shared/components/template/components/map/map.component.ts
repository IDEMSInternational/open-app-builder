import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from "@angular/core";
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
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import chroma from "chroma-js";
import BaseLayer from "ol/layer/Base";
import { RangeCustomEvent } from "@ionic/angular";
import { Feature } from "ol";

interface IMapLayer {
  id: string;
  name: string;
  description: string;
  /** the path to the GeoJSON file containing the data to be plotted */
  source_asset: string | any;
  point_radius_max: number;
  point_radius_property: string;
  point_radius_property_max: number;
  blur: number;
  fill: string;
  opacity: number;
  /** a property of the dataset to be plotted */
  property: string;
  gradient_palette: string[];
  scale_max: number;
  scale_min: number;
  scale_bins: number[];
  scale_slider: boolean;
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
  @ViewChild("mapElement") mapElement!: ElementRef<HTMLElement>;

  constructor(
    private templateAssetService: TemplateAssetService,
    private appDataService: AppDataService,
    private cdr: ChangeDetectorRef
  ) {
    super();
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
    mapLayer.setVisible(toggleValue);
  }

  public getVisibleLayerNames(layerGroup: string) {
    const groupLayers = this.mapLayerGroups.find((group) => group.id === layerGroup)?.layers;
    return groupLayers.filter((layer) => layer.getVisible()).map((layer) => layer.get("name"));
  }

  public toggleLayer(mapLayer: BaseLayer) {
    mapLayer.setVisible(!mapLayer.getVisible());
  }

  /**
   * Handles the change event from a slider component and updates the visibility of features
   * in a vector map layer based on the selected range values.
   */
  public handleSliderChange(event: any, mapLayer: BaseLayer) {
    // Only works on vector layers
    const { lower, upper } = (event as RangeCustomEvent).detail.value as {
      lower: number;
      upper: number;
    };
    const vectorLayer = mapLayer as VectorLayer;
    const propertyName = vectorLayer.get("propertyToPlot");

    const scaleMax = vectorLayer.get("scaleMax");
    const scaleMin = vectorLayer.get("scaleMin");

    const normaliseValue = (value: number) => {
      return scaleMin + (value / 100) * (scaleMax - scaleMin);
    };

    const lowerNormalised = normaliseValue(lower);
    const upperNormalised = normaliseValue(upper);

    const filterFeatures = (feature: Feature) => {
      const value = feature.get(propertyName);
      return value >= lowerNormalised && value <= upperNormalised;
    };
    vectorLayer.getSource().forEachFeature((feature: Feature) => {
      feature.set("visible", filterFeatures(feature));
    });
  }

  public handleDropdownChange(event: any, layerGroupId?: string) {
    this.makeLayersVisible(event.detail.value);
  }

  private makeLayersVisible(layers: string[], layerGroupId?: string) {
    if (layerGroupId) {
      const layerGroup = this.mapLayerGroups.find((group) => group.id === layerGroupId);
      layerGroup.layers.forEach((layer) => {
        layer.setVisible(layers.includes(layer.get("name")));
      });
      return;
    } else {
      for (const layerGroup of this.mapLayerGroups) {
        layerGroup.layers.forEach((layer) => {
          layer.setVisible(layers.includes(layer.get("name")));
        });
      }
    }
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
      this.mapLayerGroups = this.params.layerGroups;
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
  }

  private addHeatmapLayer(layer: IMapLayer, layerGroup?: string) {
    if (!layer) return;
    const {
      description,
      name,
      blur,
      point_radius_max,
      opacity,
      property: propertyToPlot,
      gradient_palette,
      scale_max,
      scale_min,
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
      visible: visible_default,
      name,
      description,
      opacity,
      propertyToPlot,
      scaleMax: scale_max,
      scaleMin: scale_min,
      scaleTitle: scale_title,
      scaleColours: gradient_palette,
    });
    this.addLayer(heatmapLayer, layerGroup);
  }
  private addVectorLayer(layer: IMapLayer, layerGroup?: string) {
    if (!layer) return;
    const {
      description,
      fill,
      name,
      opacity,
      property: propertyToPlot,
      gradient_palette,
      scale_max,
      scale_min,
      scale_title,
      source_asset,
      stroke,
      visible_default,
      point_radius_max,
      point_radius_property,
      point_radius_property_max,
      scale_slider,
    } = layer;
    if (!source_asset) return;

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: source_asset,
      }),
      style: (feature) => {
        if (feature.get("visible") === false) return null;

        const geometryType = feature.getGeometry().getType();

        if (geometryType === "Polygon") {
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

        if (geometryType === "Point") {
          const radius = point_radius_property
            ? this.calcPointRadius(
                feature.get(point_radius_property),
                point_radius_property_max,
                point_radius_max
              )
            : 2;
          return new Style({
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
      },
    });

    let scaleColours;

    if (propertyToPlot) {
      const colourScale = this.generateColourScale(scale_max, scale_min, gradient_palette);
      vectorLayer.setStyle((feature) => {
        if (feature.get("visible") === false) return null;
        const value = feature.get(propertyToPlot);
        const style = new Style({
          fill: new Fill({
            color: this.getColourForValue(colourScale, value),
          }),
          stroke: new Stroke({
            color: stroke && stroke !== "none" ? stroke : "transparent",
            width: 1,
          }),
        });
        return style;
      });
      const equidistantScaleColours = colourScale.colors(5);
      scaleColours = equidistantScaleColours;
    }

    this.setCustomLayerProperties(vectorLayer, {
      visible: visible_default,
      name,
      description,
      scaleMax: scale_max,
      scaleMin: scale_min,
      scaleTitle: scale_title,
      scaleColours,
      scaleSlider: scale_slider,
      opacity,
      propertyToPlot,
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
    console.log("addLayer called", layer);
    this.map.addLayer(layer);
    console.log("this.mapLayerGroups", this.mapLayerGroups);
    console.log("layerGroup", layerGroupId);
    const targetGroup = this.mapLayerGroups.find((group) => group.id === layerGroupId);
    targetGroup.layers.push(layer);
    console.log("this.mapLayerGroups", this.mapLayerGroups);
    // this.mapLayerGroups[layerGroupId].layers.push(layer);
    // this.mapLayers.push(layer);
    console.log("this.mapLayers", this.mapLayers);
    this.cdr.markForCheck();
  }

  private setCustomLayerProperties(
    layer: BaseLayer,
    setCustomLayerProperties: {
      visible?: boolean;
      name: string;
      description?: string;
      scaleMax?: number;
      scaleMin?: number;
      scaleTitle?: string;
      scaleColours?: string[];
      scaleSlider?: boolean;
      opacity?: number;
      propertyToPlot?: string;
    }
  ) {
    const {
      visible,
      name,
      description,
      scaleMax,
      scaleMin,
      scaleTitle,
      scaleColours,
      scaleSlider,
      opacity,
      propertyToPlot,
    } = setCustomLayerProperties;

    const cssGradientFill = scaleColours
      ? `linear-gradient(90deg, ${scaleColours.join(", ")})`
      : undefined;
    layer.setVisible(visible === undefined || !!visible);
    if (opacity || opacity === 0) layer.setOpacity(opacity);
    layer.set("name", name);
    layer.set("description", description);
    layer.set("gradientFill", cssGradientFill);
    layer.set("scaleMax", scaleMax);
    layer.set("scaleMin", scaleMin);
    layer.set("scaleTitle", scaleTitle);
    layer.set("scaleSlider", scaleSlider);
    layer.set("propertyToPlot", propertyToPlot);
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
