import { Component, OnInit } from "@angular/core";
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
import GeoJSON from "ol/format/GeoJSON";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import chroma from "chroma-js";
import BaseLayer from "ol/layer/Base";

interface IMapLayer {
  id: string;
  description: string;
  fill: string;
  name: string;
  opacity: number;
  /** a property of the dataset to be plotted */
  property: string;
  scale_fill: string;
  scale_max: number;
  scale_min: number;
  scale_title: string;
  /** the path to the GeoJSON file containing the data to be plotted */
  source_asset: string | any;
  stroke: string;
  type: "vector" | "heatmap";
  visible_default: boolean;
}

interface IMapParams {
  /**
   * TEMPLATE PARAMETER: extent.
   * Optional. The extent of the map to be displayed, i.e. the boundaries of the visible map, in EPSG:3857 co-ordinates
   */
  extent: number[];
  /**
   * TEMPLATE PARAMETER: layers.
   * A data list or data list name containing a list of layers to be added to the map. Format IMapLayer
   */
  layers: IMapLayer[];
}

@Component({
  selector: "plh-map",
  styleUrls: ["./map.component.scss"],
  templateUrl: "./map.component.html",
})
export class TmplMapComponent extends TemplateBaseComponent implements OnInit {
  public params: Partial<IMapParams> = {};
  public map: Map;
  public mapLayers: BaseLayer[] = [];

  constructor(
    private templateAssetService: TemplateAssetService,
    private appDataService: AppDataService
  ) {
    super();
  }

  async ngOnInit() {
    await this.getParams();
    await this.initialiseMap();
    this.addLayers(this.params.layers);
  }

  private async initialiseMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        extent: this.params.extent,
        showFullExtent: true,
        zoom: 2,
        maxZoom: 18,
      }),
    });
  }

  private async getParams() {
    const layersRaw = getParamFromTemplateRow(this._row, "layers", null);
    if (!layersRaw) {
      this.params.layers = [];
    }
    // If raw value is a string, assume it is a data list name and fetch the associated data
    else if (typeof layersRaw === "string") {
      const dataList = await this.appDataService.getSheet("data_list", layersRaw);
      this.params.layers = dataList?.rows || [];
    }
    // Else assume it is a parsed data list, as passed by e.g. @data.my_map_data_list
    else {
      this.params.layers = Object.values(layersRaw);
    }

    const extentRaw = getStringParamFromTemplateRow(this._row, "extent", null);
    if (extentRaw) {
      this.params.extent = extentRaw.split(",").map((num) => parseFloat(num.trim()));
    }
  }

  private addLayers(layers: IMapLayer[]) {
    for (const layer of layers) {
      if (layer.type === "vector") {
        this.addVectorLayer(layer);
      }
      // TODO: handle other layer types, e.g. heatmap
    }
  }

  private addVectorLayer(layer: IMapLayer) {
    if (!layer) return;
    const {
      description,
      fill,
      name,
      opacity,
      property: propertyToPlot,
      scale_fill,
      scale_max,
      scale_min,
      scale_title,
      source_asset,
      stroke,
      visible_default,
    } = layer;
    if (!source_asset) return;

    const assetPath = this.templateAssetService.getTranslatedAssetPath(layer.source_asset);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: assetPath,
      }),
      style: new Style({
        fill: new Fill({
          color: fill && fill !== "none" ? fill : "transparent",
        }),
        stroke: new Stroke({
          color: stroke || "black",
          width: 1,
        }),
      }),
    });

    if (propertyToPlot) {
      const scaleColours = scale_fill?.split(",").map((str) => str.trim());
      const colourScale = this.generateColourScale(scale_max, scale_min, scaleColours);
      vectorLayer.setStyle((feature) => {
        const value = feature.get(propertyToPlot);
        const style = new Style({
          fill: new Fill({
            color: this.getColourForValue(colourScale, value),
          }),
          stroke: new Stroke({
            color: "black",
            width: 1,
          }),
        });
        return style;
      });
      const equidistantScaleColours = colourScale.colors(5);
      vectorLayer.set(
        "gradientFill",
        `linear-gradient(0deg, ${equidistantScaleColours.join(", ")})`
      );
      vectorLayer.set("scaleMax", scale_max);
      vectorLayer.set("scaleMin", scale_min);
      vectorLayer.set("scaleTitle", scale_title);
    }

    if (opacity || opacity === 0) vectorLayer.setOpacity(opacity);
    // Set default layer visibility, defaulting to visible if not defined
    vectorLayer.setVisible(visible_default === undefined || !!visible_default);
    // Add custom properties to the layer
    vectorLayer.set("name", name);
    vectorLayer.set("description", description);

    this.map.addLayer(vectorLayer);
    this.mapLayers.push(vectorLayer);
  }

  public handleToggleChange(event: any, mapLayer: BaseLayer) {
    const toggleValue = event.detail.checked;
    mapLayer.setVisible(toggleValue);
  }

  public toggleLayer(mapLayer: BaseLayer) {
    mapLayer.setVisible(!mapLayer.getVisible());
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
