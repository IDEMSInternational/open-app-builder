import { Component, OnInit, signal, Signal } from "@angular/core";
import { Parameters, ReactiveBaseComponent } from "../../reactive-base.component";
import { NgStyle } from "@angular/common";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";

const parameters: Parameters = {
  style: { name: "style", value: "" },
  textAlign: { name: "text_align", value: null as string },
  type: { name: "type", value: "marked" },
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
export class TextComponent extends ReactiveBaseComponent implements OnInit {
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
