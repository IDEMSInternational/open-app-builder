import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { getParamFromTemplateRow } from "src/app/shared/utils";

interface IPlhBottomNavigationParams {
  /** TEMPLATE PARAMETER: button_list. A list of nav button items */
  buttonList: INavButton[];
  /** TEMPLATE PARAMETER: hide_inactive_text. Hide text on inactive buttons. Default `false` */
  hideInactiveText?: boolean;
}
interface INavButton {
  icon: string | null;
  label: string | null;
  target_template: string | null;
  name: string | null;
  active_icon: string | null;
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

  getParams() {
    this.params.buttonList = getParamFromTemplateRow(this._row, "button_list", []);
    this.params.hideInactiveText = getParamFromTemplateRow(this._row, "hide_inactive_text", false);
  }
}
