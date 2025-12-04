import { Component, signal } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { RemoteAssetService } from "src/app/shared/services/remote-asset/remote-asset.service";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  asset_pack: coerce.string("debug_asset_pack_1"),
  default_text: coerce.string("Download asset pack"),
  progress_text: coerce.string("Downloading..."),
  success_text: coerce.string("Success"),
  error_text: coerce.string("Error"),
}));

@Component({
  selector: "tmpl-button-asset-pack-download",
  templateUrl: "./button-asset-pack-download.component.html",
  styleUrls: ["./button-asset-pack-download.component.scss"],
})
export class TmplButtonAssetPackDownloadComponent extends TemplateBaseComponentWithParams(
  AuthorSchema
) {
  public status = signal<"initial" | "downloading" | "success" | "error">("initial");

  constructor(private remoteAssetService: RemoteAssetService) {
    super();
  }

  public async handleClick(event: Event) {
    this.status.set("downloading");

    const success = await this.remoteAssetService.downloadAssetPackByName(this.params().assetPack);

    this.status.set(success ? "success" : "error");

    // Allow for additional actions to be authored (will run after the download is complete)
    this.triggerActions("click");
  }
}
