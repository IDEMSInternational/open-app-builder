import {
  AfterViewInit,
  Component,
  HostBinding,
  input,
  OnDestroy,
  signal,
  ViewContainerRef,
} from "@angular/core";

@Component({
  selector: "tmpl-display-group-sticky",
  templateUrl: "display-group-sticky.component.html",
  styleUrl: "display-group-sticky.component.scss",
})
/**
 *
 */
export class TmplDisplayGroupStickyComponent implements AfterViewInit, OnDestroy {
  position = input.required<"top" | "bottom">();
  ignoreSafeArea = input<boolean>(false);
  height = signal(0);
  // use hostBinding to specify host top/bottom as signals do not nicely
  // map to hostAttribute https://github.com/angular/angular/issues/53888
  @HostBinding("attr.sticky-position")
  get stickyPosition() {
    return this.position();
  }
  @HostBinding("attr.ignore-safe-area")
  get shouldIgnoreSafeArea() {
    return this.ignoreSafeArea();
  }

  private resizeObserver = new ResizeObserver((entries) => this.handleSizeChange(entries));

  constructor(private readonly viewRef: ViewContainerRef) {}

  ngAfterViewInit() {
    // Observe own component height and update signal so that parent display-group
    // can adjust padding as required
    this.resizeObserver.observe(this.viewRef.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  private handleSizeChange(entries: ResizeObserverEntry[]) {
    const [{ contentRect }] = entries;

    let topPadding = 0;
    if (this.position() === "top") {
      // As the display group now sits at the top of the content window ignoring the app-wide padding applied to ion-content,
      // the height of the inline display group placeholder should account for this padding
      topPadding = this.getContentContainerTopPadding();
    }

    this.height.set(contentRect.height - topPadding);
  }

  private getContentContainerTopPadding() {
    const computedStyles = getComputedStyle(this.viewRef.element.nativeElement);
    const ionContentPaddingTop = parseFloat(computedStyles.getPropertyValue("--padding-top")) || 0;

    // Padding within a popup is not determined by the --padding-top property.
    // HACK: Use inconsequential CSS property (scroll-margin-top) to force browser to compute the value of our CSS custom property.
    // If we just get the property value, i.e. `--pop-up-top-padding`, it can return the raw calc value,
    // e.g. `max(0px, 24px)`, which would still need to be computed.
    const popupPadding = parseFloat(computedStyles.scrollMarginTop) || 0;
    return ionContentPaddingTop + popupPadding;
  }
}
