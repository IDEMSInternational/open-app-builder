import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getParamFromTemplateRow } from "src/app/shared/utils";
import { parseValueListItems } from "../../utils";

interface IButton {
  image: string | null;
  text: string | null;
  target_template: string | null;
  name: string | null;
}

@Component({
  selector: "plh-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class TmplNavigationBarComponent extends TemplateBaseComponent implements OnInit {
  buttonList: IButton[];

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    const buttonListRaw: string[] = getParamFromTemplateRow(this._row, "button_list", []);
    this.buttonList = parseValueListItems(buttonListRaw);
  }
}
