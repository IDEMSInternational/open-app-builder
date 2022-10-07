import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getParamFromTemplateRow } from "src/app/shared/utils";
import { parseValueListItems } from "../../utils";
import { parseAppDataActionString } from "packages/scripts/src/commands/app-data/convert/utils";

interface IButton {
  image: string | null;
  text: string | null;
  target_template: string | null;
}

@Component({
  selector: "plh-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class TmplNavigationBarComponent extends TemplateBaseComponent implements OnInit {
  buttonList: IButton[];

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    const buttonListRaw: string[] = getParamFromTemplateRow(this._row, "button_list", []);
    this.buttonList = parseValueListItems(buttonListRaw);
  }

  goToTargetTemplate(targetTemplate) {
    this.parent.handleActions(
      [
        {
          action_id: "go_to",
          args: [targetTemplate],
          trigger: "click",
        },
      ],
      this._row
    );
  }

  /** Alternative method to handle general actions passed into button_list */
  // handleActions(buttonActions) {
  //   buttonActions
  //     .map((actionString) => parseAppDataActionString(actionString))
  //     .filter((action) => action !== null);
  //   this.parent.handleActions(buttonActions, this._row)
  // }
}
