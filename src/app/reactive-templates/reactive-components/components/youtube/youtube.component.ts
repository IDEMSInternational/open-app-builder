import { Component, computed, inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Capacitor } from "@capacitor/core";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

const IFRAME_PROXY_URL = "https://idemsinternational.github.io/youtube-iframe-proxy/";

const parameters = () =>
  defineParameters({
    allowFullscreen: new Parameter("allow_fullscreen", true),
    orientation: new Parameter<"landscape" | "portrait">("orientation", "landscape"),
  });

@Component({
  selector: "oab-youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.scss"],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class YoutubeComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  private domSanitizer = inject(DomSanitizer);
  private templateTranslateService = inject(TemplateTranslateService);
  private useProxyIframe = Capacitor.getPlatform() === "ios";

  public orientation = computed(() =>
    this.params.orientation.value() === "portrait" ? "portrait" : "landscape"
  );

  public urlParams = computed(() => {
    const value = this.value();
    if (value && typeof value === "string" && value.startsWith("https://")) {
      const url = new URL(value);
      const currentParams = Object.fromEntries(url.searchParams.entries());
      const videoId = url.searchParams.get("v");
      if (videoId) {
        return {
          ...currentParams,
          color: "white",
          fs: this.params.allowFullscreen.value() ? "1" : "0",
          hl: this.templateTranslateService.app_language_code,
          playsinline: "1",
          rel: "0",
          v: videoId,
        };
      }
    }
    console.error("[Youtube] Invalid value:", value);
    return undefined;
  });

  public iframeSrc = computed(() => {
    const urlParams = this.urlParams();
    if (!urlParams) return;

    let url: URL;
    if (this.useProxyIframe) {
      url = new URL(IFRAME_PROXY_URL);
      for (const [key, value] of Object.entries(urlParams)) {
        url.searchParams.set(key, value);
      }
    } else {
      const { v, ...keptParams } = urlParams;
      url = new URL(`https://www.youtube-nocookie.com/embed/${v}`);
      for (const [key, value] of Object.entries(keptParams)) {
        url.searchParams.set(key, value);
      }
    }
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url.toString());
  });
}
