import { Component, OnInit } from '@angular/core';
import { TemplateBaseComponent } from 'src/app/shared/components/template/components/base';
import { getParamFromTemplateRow } from "src/app/shared/utils";

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
  buttonList: INavButton[];

  ngOnInit() {
    this.getParams();
  }

  //get template parameters
  getParams() {
    const buttonListRaw: string[] = getParamFromTemplateRow(this._row, "button_list", []);
    this.buttonList = parseValueListItems(buttonListRaw);
  }
}

function parseValueListItems(items: string[]): any[] {
  return items.map((item) => {
    // avoid parsing items that may have been processed already
    if (typeof item !== "string") return item;
    const props = {};
    item
      .split("|")
      .map((i) => i.trim())
      .forEach((i) => {
        const [key, value] = i.split(":").map((v) => v.trim());
        props[key] = value;
      });
    return props;
  });
}




