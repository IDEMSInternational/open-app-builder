import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AnimationId, ANIMATION_METADATA_BY_ID } from ".";

@Component({
  selector: "plh-css-animation",
  template: `<ng-template #dynamicComponent></ng-template>
    <div class="svg-anim" [ngClass]="animationId" *ngIf="svgData" [innerHtml]="svgData"></div>
    `,
  styleUrls: ["./svg-anims.scss"]
})
export class AnimationComponent implements AfterViewInit {
  @Input() animationId: AnimationId;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) vcRef: ViewContainerRef;
  
  svgData: SafeHtml;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private domSanitizer: DomSanitizer, private http: HttpClient) {
  }

  ngAfterViewInit() {
    if (ANIMATION_METADATA_BY_ID[this.animationId] && ANIMATION_METADATA_BY_ID[this.animationId].component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ANIMATION_METADATA_BY_ID[this.animationId].component
      );
      const ref = this.vcRef.createComponent(componentFactory);
      ref.changeDetectorRef.detectChanges();
    }
    if (ANIMATION_METADATA_BY_ID[this.animationId] && ANIMATION_METADATA_BY_ID[this.animationId].svgAssetPath) {
      this.loadSvg(ANIMATION_METADATA_BY_ID[this.animationId].svgAssetPath);
    }
  }

  loadSvg(assetPath: string) {
    this.http.get(assetPath, {
      responseType: "text"
    }).subscribe((text) => {
      this.svgData = this.domSanitizer.bypassSecurityTrustHtml(text);
    }, (err) => {
      console.warn("Error loading animation svg", err);
    })
  }
}