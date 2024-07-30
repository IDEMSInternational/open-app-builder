import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
// import 'ol/ol.css';
import Map from "ol/Map";
import View from "ol/View";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import * as proj from "ol/proj";
import * as extent from "ol/extent";

const kenyaExtent = proj.transformExtent(
  [33.9098, -4.6781, 41.8994, 5.0199],
  "EPSG:4326",
  "EPSG:3857"
);

@Component({
  selector: "plh-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  standalone: true,
})
export class TmplMapComponent extends TemplateBaseComponent implements OnInit {
  public map: Map;
  ngOnInit() {
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
}
