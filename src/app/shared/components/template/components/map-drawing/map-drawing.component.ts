import { Component, OnInit } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { TerraDraw, TerraDrawPolygonMode } from "terra-draw";
import { TerraDrawOpenLayersAdapter } from "terra-draw-openlayers-adapter";

import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { Circle, Icon, Stroke, Style, Fill } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat, getUserProjection, Projection, toLonLat } from "ol/proj";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({}));

@Component({
  selector: "oab-map-drawing",
  templateUrl: "./map-drawing.component.html",
  styleUrls: ["./map-drawing.component.scss"],
  standalone: false,
})
export class MapDrawingComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements OnInit
{
  public terraDraw: TerraDraw | null = null;

  ngOnInit(): void {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
      controls: [],
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
      modes: [new TerraDrawPolygonMode()],
    });

    map.once("rendercomplete", () => {
      this.terraDraw?.start();
      this.terraDraw?.setMode("polygon");
    });
  }
}
