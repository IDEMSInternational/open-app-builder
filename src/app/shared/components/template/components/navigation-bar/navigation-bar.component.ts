import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getParamFromTemplateRow, getTemplateNameFromUrl } from "src/app/shared/utils";
import { parseValueListItems } from "../../utils";
import { Router } from "@angular/router";

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

  constructor(private router: Router) {
    super();
  }

  get currentTemplate() {
    return getTemplateNameFromUrl(this.router.url);
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
}
