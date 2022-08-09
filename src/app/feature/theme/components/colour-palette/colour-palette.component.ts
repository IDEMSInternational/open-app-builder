import { Component } from "@angular/core";

@Component({
  selector: "plh-colour-palette",
  templateUrl: "./colour-palette.component.html",
  styleUrls: ["./colour-palette.component.scss"],
})
export class ColourPaletteComponent {
  themeColours = ["primary", "secondary"];
  colourWeights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
}
