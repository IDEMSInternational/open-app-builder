import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
// import 'ol/ol.css';
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

import { TemplateAssetService } from "../../services/template-asset.service";
import { getParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

// const kenyaExtent = proj.transformExtent(
//   [33.9098, -4.6781, 41.8994, 5.0199],
//   "EPSG:4326",
//   "EPSG:3857"
// );
const kenyaExtent = [3773864.3, -520876.1, 4661891.1, 636925.3];

interface IMapLayer {
  id: string;
  type: "vector" | "heatmap";
  source_asset: string | any;
}

interface IMapParams {
  /**
   * TEMPLATE PARAMETER: extent.
   * Optional. The extent of the map to be displayed, in EPSG:3857 co-ordinates
   */
  extent: number[];
  /**
   * TEMPLATE PARAMETER: layers.
   * A data list or data list name containeing a list of layers to be added to the map. Format IMapLayer
   */
  rawLayers: string;
}

@Component({
  selector: "plh-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  standalone: true,
})
export class TmplMapComponent extends TemplateBaseComponent implements OnInit {
  constructor(
    private templateAssetService: TemplateAssetService,
    private appDataService: AppDataService
  ) {
    super();
  }
  public params: Partial<IMapParams> = {};
  private layers: IMapLayer[] = [];

  public map: Map;

  async ngOnInit() {
    await this.initialiseMap();
    await this.getParams();
    this.addLayers(this.layers);
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
        extent: extent.buffer(kenyaExtent, 100000),
        showFullExtent: true,
        zoom: 2,
        maxZoom: 18,
      }),
    });
  }

  private async getParams() {
    this.params.rawLayers = getParamFromTemplateRow(this._row, "layers", null);
    console.log("rawLayers", this.params.rawLayers);
    // If raw value is a string, assume it is a data list name and fetch the associated data
    if (typeof this.params.rawLayers === "string") {
      const dataList = await this.appDataService.getSheet("data_list", this.params.rawLayers);
      this.layers = dataList?.rows;
    }
    // Else assume it is a parsed data list, as passed by e.g. @data.my_map_data_list
    else {
      this.layers = Object.values(this.params.rawLayers);
    }
  }

  private addLayers(layers: IMapLayer[]) {
    for (const layer of layers) {
      if (layer.type === "vector") {
        this.addVectorLayer(layer);
      }
    }
  }

  private addVectorLayer(layer: IMapLayer) {
    if (!layer?.source_asset) return;
    const assetPath = this.templateAssetService.getTranslatedAssetPath(layer.source_asset);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: assetPath,
      }),
    });

    this.map.addLayer(vectorLayer);
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
