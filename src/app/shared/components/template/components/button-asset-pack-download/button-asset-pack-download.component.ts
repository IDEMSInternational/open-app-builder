import { Component, computed, effect, signal } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { RemoteAssetService } from "src/app/shared/services/remote-asset/remote-asset.service";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  asset_pack: coerce.string("debug_asset_pack_1"),
  default_text: coerce.string("Download asset pack"),
  progress_text: coerce.string("Downloading..."),
  success_text: coerce.string("Success"),
  error_text: coerce.string("Error"),
  progress_display: coerce.allowedValues(["spinner", "count", "percent"], "count"),
}));

@Component({
  selector: "tmpl-button-asset-pack-download",
  templateUrl: "./button-asset-pack-download.component.html",
  styleUrls: ["./button-asset-pack-download.component.scss"],
  standalone: false,
})
export class TmplButtonAssetPackDownloadComponent extends TemplateBaseComponentWithParams(
  AuthorSchema
) {
  public status = signal<"initial" | "downloading" | "success" | "error">("initial");
  /**
   * Text shown alongside `progress_text` while downloading.
   *
   * `count` is a genuine file count, which stays accurate however the pack was fetched but steps
   * unevenly - pack files range from under a kilobyte to a couple of megabytes. `percent` tracks
   * bytes while a pack archive is streaming, so it moves smoothly, which suits a bar better.
   */
  public progressCountText = computed(() => {
    const progressDisplay = this.params().progressDisplay;
    if (progressDisplay === "percent") {
      const percent = this.remoteAssetService.downloadProgressPercent();
      return percent === null ? "" : `(${percent}%)`;
    }
    if (progressDisplay !== "count") return "";
    const progress = this.remoteAssetService.downloadProgressCount();
    if (!progress?.total) return "";
    return `(${progress.completed}/${progress.total})`;
  });

  constructor(private remoteAssetService: RemoteAssetService) {
    super();
    effect(
      () => {
        this.setValue(this.status());
      },
      { allowSignalWrites: true }
    );
  }

  public async handleClick(event: Event) {
    this.status.set("downloading");

    // Uncomment this block to fake a slow download for visual testing
    // const total = 5;
    // this.remoteAssetService.downloadProgressCount.set({ completed: 0, total });
    // for (let i = 1; i <= total; i++) {
    //   await new Promise((resolve) => setTimeout(resolve, 700));
    //   this.remoteAssetService.downloadProgressCount.update((p) =>
    //     p ? { ...p, completed: i } : p
    //   );
    // }
    // this.status.set("success");
    // return;

    // Uncomment this block to fake a download error
    // return this.status.set("error");

    const success = await this.remoteAssetService.downloadAssetPackByName(this.params().assetPack);

    this.status.set(success ? "success" : "error");

    // Allow for additional actions to be authored (will run after the download attempt is complete)
    this.triggerActions("click");
  }
}
