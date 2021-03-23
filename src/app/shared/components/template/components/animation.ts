import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AnimationId, ANIMATION_METADATA_BY_ID } from "../../animations";
import { FlowTypes, ITemplateRowProps } from "../models";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-css-animation",
  template: `<div class="tmpl-css-anim">
    <ng-template #dynamicComponent></ng-template>
    <div class="svg-anim" [ngClass]="animationId" *ngIf="svgData" [innerHtml]="svgData"></div>
  </div>`,
  styles: [
    `
      .tmpl-css-anim {
        margin-left: auto;
        margin-right: auto;
        max-width: 500px;
      }
    `,
  ],
  styleUrls: ["../../animations/svg-anims.scss"],
})
export class TmplAnimationComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, AfterViewInit {
  @Input() animationId: AnimationId;
  @ViewChild("dynamicComponent", { read: ViewContainerRef }) vcRef: ViewContainerRef;

  svgData: SafeHtml;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    super();
  }

  ngAfterViewInit() {
    if (!this.animationId) {
      this.animationId = this._row?.value;
    }
    if (
      ANIMATION_METADATA_BY_ID[this.animationId] &&
      ANIMATION_METADATA_BY_ID[this.animationId].component
    ) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ANIMATION_METADATA_BY_ID[this.animationId].component
      );
      const ref = this.vcRef.createComponent(componentFactory);
      ref.changeDetectorRef.detectChanges();
    }
    if (
      ANIMATION_METADATA_BY_ID[this.animationId] &&
      ANIMATION_METADATA_BY_ID[this.animationId].svgAssetPath
    ) {
      this.loadSvg(ANIMATION_METADATA_BY_ID[this.animationId].svgAssetPath);
    }
  }

  loadSvg(assetPath: string) {
    this.http
      .get(assetPath, {
        responseType: "text",
      })
      .subscribe(
        (text) => {
          this.svgData = this.domSanitizer.bypassSecurityTrustHtml(text);
        },
        (err) => {
          console.warn("Error loading animation svg", err);
        }
      );
  }
}
