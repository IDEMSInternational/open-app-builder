import { Component, OnInit, signal, Signal } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { defineParameters, Parameter } from "../../parameters";
import { NgStyle } from "@angular/common";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";

const parameters = defineParameters({
  style: new Parameter<string>("style", ""),
  textAlign: new Parameter<string>("text_align", null),
  type: new Parameter<string>("type", "marked"),
});

@Component({
  selector: "oab-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"],
  standalone: true,
  imports: [
    NgStyle,
    TemplatePipesModule, // todo: make pipes standalone
  ],
  providers: [{ provide: ROW_PARAMETERS, useValue: parameters }],
})
export class TextComponent extends RowBaseComponent<typeof parameters> implements OnInit {
  public hasTextValue: Signal<boolean>;

  ngOnInit(): void {
    super.ngOnInit();

    this.hasTextValue = signal(
      !["undefined", "NaN", "null", '""'].includes(this.row().value as string)
    );
  }
}
