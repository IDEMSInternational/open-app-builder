import { AfterViewInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { AnimationId, ANIMATION_METADATA_BY_ID } from ".";

@Component({
  selector: "plh-css-animation",
  template: `<ng-template #dynamicComponent></ng-template>
    `
})
export class AnimationComponent implements AfterViewInit {
  @Input() animationId: AnimationId;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) vcRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }



  ngAfterViewInit() {
    if (ANIMATION_METADATA_BY_ID[this.animationId] && ANIMATION_METADATA_BY_ID[this.animationId].component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ANIMATION_METADATA_BY_ID[this.animationId].component
      );
      const ref = this.vcRef.createComponent(componentFactory);
      ref.changeDetectorRef.detectChanges();
    }
  }
}