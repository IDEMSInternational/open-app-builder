import { Component, computed, inject } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { TemplateAssetService } from "../services/template-asset.service";

interface IAuthorParams {
  /** TEMPLATE_PARAMETER: "style". Default null */
  style?: string;
}

interface IComponentParams {
  style: "no-padding" | "rounded_corners";
}

@Component({
  selector: "plh-tmpl-image",
  template: `
    <div class="tmpl-image-container" [attr.data-param-style]="params().style">
      @if (assetSrc(); as src) {
        <img [src]="src" />
      }
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"],
  styles: [
    `
      :host {
        display: contents;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: var(--tiny-padding);
      }
      img[data-param-style~="no-padding"] {
        padding: 0;
      }
      .tmpl-image-container {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class TmplImageComponent extends TemplateBaseComponent {
  private assetService = inject(TemplateAssetService);

  /** SafeUrl to render */
  public assetSrc = this.assetService.translatedAssetSignal(this.value);

  public params = computed(() => this.mapParams(this.parameterList()));

  private mapParams(authorParams: IAuthorParams = {}): IComponentParams {
    const { style } = authorParams;
    return {
      style: (style as IComponentParams["style"]) || null,
    };
  }
}
