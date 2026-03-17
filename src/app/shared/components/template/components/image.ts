import { Component, computed, inject } from "@angular/core";
import { TemplateBaseComponent } from "./base";

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
      <img [src]="value() | translatedAsset" />
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
  standalone: false,
})
export class TmplImageComponent extends TemplateBaseComponent {
  public params = computed(() => this.mapParams(this.parameterList()));

  private mapParams(authorParams: IAuthorParams = {}): IComponentParams {
    const { style } = authorParams;
    return {
      style: (style as IComponentParams["style"]) || null,
    };
  }
}
