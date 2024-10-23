import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../../../../src/app/shared/components/template/components/base";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

interface IDemoBasicComponentParams {
  /** TEMPLATE_PARAMETER: "variant". Default "square_primary" */
  variant: "square_primary" | "circle_secondary";
  /** TEMPLATE_PARAMETER: "my_boolean_param". A paramater that takes a boolean value. Default true */
  myBooleanParam: boolean;
  /** TEMPLATE_PARAMETER: "my_string_param". A string to be displayed */
  myStringParam: string;
}

@Component({
  selector: "demo-basic",
  templateUrl: "./basic.component.html",
  styleUrls: ["./basic.component.scss"],
})
export class DemoBasicComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IDemoBasicComponentParams> = {};

  ngOnInit() {
    this.getParams();
  }

  // Parse parameters into variables from the template row's `parameter_list`
  private getParams() {
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "square_primary")
      .split(",")
      .join(" ") as IDemoBasicComponentParams["variant"];
    this.params.myBooleanParam = getBooleanParamFromTemplateRow(
      this._row,
      "my_boolean_param",
      true
    );
    this.params.myStringParam = getStringParamFromTemplateRow(this._row, "my_string_param", "");
  }

  handleClick() {
    // Trigger a named "click" action that can be listened for and handled in the template row
    this.triggerActions("click");
  }
}
