import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { TemplateAssetService } from "../../services/template-asset.service";
import { getParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector } from "ol/source";
import TileLayer from "ol/layer/Tile";
import HeatmapLayer from "ol/layer/Heatmap";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import * as proj from "ol/proj";
import * as extent from "ol/extent";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import chroma from "chroma-js";
import BaseLayer from "ol/layer/Base";

interface IMapLayer {
  id: string;
  name: string;
  // a property of the dataset to be plotted
  property: string;
  scale_max: number;
  scale_min: number;
  // the path to the GeoJSON file containing the data to be plotted
  source_asset: string | any;
  type: "vector" | "heatmap";
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
  constructor(
    private templateAssetService: TemplateAssetService,
    private appDataService: AppDataService
  ) {
    super();
  }
  public params: Partial<IMapParams> = {};
  public mapLayers: BaseLayer[] = [];

  public map: Map;

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
    // If raw value is a string, assume it is a data list name and fetch the associated data
    if (typeof layersRaw === "string") {
      const dataList = await this.appDataService.getSheet("data_list", layersRaw);
      this.params.layers = dataList?.rows;
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
    const { property: propertyToPlot, source_asset, scale_max, scale_min, name } = layer;
    if (!source_asset) return;

    const assetPath = this.templateAssetService.getTranslatedAssetPath(layer.source_asset);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: assetPath,
      }),
    });

    vectorLayer.set("name", name);

    if (propertyToPlot) {
      vectorLayer.setStyle((feature) => {
        const value = feature.get(propertyToPlot);
        const style = new Style({
          fill: new Fill({
            color: this.getColourForValue(value, scale_max, scale_min),
          }),
          stroke: new Stroke({
            color: "black",
            width: 1,
          }),
        });
        return style;
      });
    }

    console.log("vectorLayer", vectorLayer);
    this.map.addLayer(vectorLayer);
    this.mapLayers.push(vectorLayer);
  }

  public handleToggleChange(event: any, mapLayer: BaseLayer) {
    const toggleValue = event.detail.checked;
    mapLayer.setVisible(toggleValue);
  }

  private toggleLayer(mapLayer: BaseLayer) {
    mapLayer.setVisible(!mapLayer.getVisible());
  }

  private getColourForValue(value: number, scaleMax: number = 2000000, sacleMin: number = 0) {
    const colourScale = chroma
      .scale(["purple", "blue", "green", "yellow"])
      .domain([sacleMin, scaleMax])
      .mode("lab");
    // .gamma(2)
    // .correctLightness()
    return colourScale(value).alpha(0.6).css();
  }
  async getFeatures(assetRef: string) {
    let data = await this.templateAssetService.fetchAsset(assetRef);

    const features = new GeoJSON().readFeatures(
      data
      // {
      // dataProjection: "EPSG:32643",
      // featureProjection: "EPSG:3857"
      // }
    );
    return features;
  }
}
