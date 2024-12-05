import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

interface IModalParams {
  /* TEMPLATE PARAMETER: "gift_image_asset". The image of the gift */
  giftImageAsset: string;
  /* TEMPLATE PARAMETER: "background_image_asset". The background image of the modal */
  backgroundImageAsset: string;
}

@Component({
  selector: "plh-completion-modal",
  templateUrl: "./completion-modal.component.html",
  styleUrls: ["./completion-modal.component.scss"],
})
export class PlhCompletionModalComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IModalParams> = {};

  ngOnInit() {
    this.getParams();
  }

  private getParams() {
    this.params.giftImageAsset = getStringParamFromTemplateRow(this._row, "gift_image_asset", "");
    this.params.backgroundImageAsset = getStringParamFromTemplateRow(
      this._row,
      "background_image_asset",
      ""
    );
  }
}
