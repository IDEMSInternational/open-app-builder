import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { getParamFromTemplateRow } from "src/app/shared/utils";

interface IPlhBottomNavigationParams {
  /** TEMPLATE PARAMETER: button_list. A list of nav button items */
  buttonList: INavButton[];
}

interface INavButton {
  icon: string | null;
  label: string | null;
  target_template: string | null;
  name: string | null;
}
@Component({
  selector: "plh-bottom-navigation-bar",
  templateUrl: "./bottom-navigation-bar.component.html",
  styleUrls: ["./bottom-navigation-bar.component.scss"],
})
export class PlhBottomNavigationBarComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IPlhBottomNavigationParams> = {};

  ngOnInit() {
    this.getParams();
  }

  //get template parameters
  getParams() {
    this.params.buttonList = getParamFromTemplateRow(this._row, "button_list", []);
  }
}
