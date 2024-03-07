import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { DomController, ScrollDetail } from "@ionic/angular";
import { Subscription } from "rxjs/internal/Subscription";
import { Subject, filter, map } from "rxjs";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { IAppConfig } from "src/app/shared/model";

/** The id of the ion-content component upon which scrolling will trigger the collapse */
const SCROLL_AREA_ID = "collapseOnScrollTargetScrollArea";

@Directive({
  selector: "[plhCollapseOnScroll]",
})
export class CollapseOnScrollDirective implements OnInit, OnDestroy {
  @Input("plhCollapseOnScroll") scrollEvents$: Subject<any>;

  private hidden: boolean = false;
  private triggerDistance: number = 20;
  scrollSubscription$: Subscription;
  defaultHeight: number;
  collapse: boolean;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController,
    private appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    this.subscribeToAppConfigChanges();
    if (this.collapse) {
      this.initStyles();
      const scrollAreaStream$ = this.scrollEvents$.pipe(
        filter(
          (scrollEvent: CustomEvent) => (scrollEvent.target as HTMLElement).id === SCROLL_AREA_ID
        ),
        map((scrollEvent) => scrollEvent.detail)
      );
      this.scrollSubscription$ = scrollAreaStream$.subscribe((scrollDetail: ScrollDetail) => {
        let delta = scrollDetail.deltaY;

        if (scrollDetail.currentY === 0 && this.hidden) {
          this.show();
        } else if (!this.hidden && delta > this.triggerDistance) {
          this.hide();
        } else if (this.hidden && delta < -this.triggerDistance) {
          this.show();
        }
      });
    }
  }

  subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      const { collapse, variant, heightsMap } = appConfig.APP_HEADER_DEFAULTS;
      this.collapse = collapse;
      this.defaultHeight = heightsMap[variant] || heightsMap.default;
    });
  }

  ngOnDestroy(): void {
    this.scrollSubscription$.unsubscribe();
  }

  initStyles() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, "transition", "0.2s linear");
      this.renderer.setStyle(this.element.nativeElement, "height", `${this.defaultHeight}px`);
    });
  }

  hide() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, "min-height", "0px");
      this.renderer.setStyle(this.element.nativeElement, "height", "0px");
      this.renderer.setStyle(this.element.nativeElement, "opacity", "0");
      this.renderer.setStyle(this.element.nativeElement, "padding", "0");
    });
    this.hidden = true;
  }

  show() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, "height", `${this.defaultHeight}px`);
      this.renderer.removeStyle(this.element.nativeElement, "opacity");
      this.renderer.removeStyle(this.element.nativeElement, "min-height");
      this.renderer.removeStyle(this.element.nativeElement, "padding");
    });
    this.hidden = false;
  }
}
