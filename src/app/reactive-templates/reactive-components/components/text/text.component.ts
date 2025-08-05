import { Component, OnInit, signal, Signal } from "@angular/core";
import { RowBaseComponent } from "../../reactive-base.component";
import { Parameter, Parameters } from "../../parameters";
import { NgStyle } from "@angular/common";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";

const parameters: Parameters = {
  style: new Parameter<string>("style", ""),
  textAlign: new Parameter<string>("text_align", null),
  type: new Parameter<string>("type", "marked"),
};

@Component({
  selector: "oab-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"],
  standalone: true,
  imports: [
    NgStyle,
    TemplatePipesModule, // todo: make pipes standalone
  ],
})
export class TextComponent extends RowBaseComponent implements OnInit {
  public hasTextValue: Signal<boolean>;

  constructor() {
    super(parameters);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.hasTextValue = signal(
      !["undefined", "NaN", "null", '""'].includes(this.row().value as string)
    );
  }
}
