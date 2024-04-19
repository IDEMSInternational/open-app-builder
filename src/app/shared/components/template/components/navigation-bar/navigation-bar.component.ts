import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getParamFromTemplateRow } from "src/app/shared/utils";

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

/**
 * Radio group and other value lists are often formatted with both name and text properties,
 * which are (currently) separated out at runtime. This function takes the value_list
 * string array and formats into an object array
 * @param items
 * ```
 * [name:name_var_1 | text:Option 1, name:name_var_2 | text: Option 2]
 * ```
 * @returns
 * ```
 * [{name:"name_var_1", text:"Option 1"}, {name:"name_var_2", text: "Option 2"}]
 * ```
 * @deprecated v0.16.27 - PR 2211 should have enabled support for parsing at compile time
 * have added return in case already processed but should hopefully be able to remove in future
 */
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
