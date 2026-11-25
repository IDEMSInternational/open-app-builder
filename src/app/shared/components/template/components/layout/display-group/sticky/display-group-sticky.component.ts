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
  styleUrls: ["display-group-sticky.component.scss"],
  exportAs: "tmplDisplayGroupSticky",
  standalone: false,
})
/**
 *
 */
export class TmplDisplayGroupStickyComponent implements AfterViewInit, OnDestroy {
  position = input.required<"top" | "bottom">();
  height = signal(0);
  // use hostBinding to specify host top/bottom as signals do not nicely
  // map to hostAttribute https://github.com/angular/angular/issues/53888
  @HostBinding("attr.sticky-position")
  get stickyPosition() {
    return this.position();
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

    // As the display group sits at the edge of the content window, ignoring the padding of the page or
    // pop-up around the scrollable content, the inline placeholder should account for this padding
    this.height.set(contentRect.height - this.getContentContainerPadding(this.position()));
  }

  private getContentContainerPadding(side: "top" | "bottom") {
    const element: HTMLElement = this.viewRef.element.nativeElement;
    // Pop-ups pad their container, which can use max() and env(), so read the resolved padding
    const popUpContainer = element.closest(".popup-container");
    if (popUpContainer) {
      const { paddingTop, paddingBottom } = getComputedStyle(popUpContainer);
      return parseFloat(side === "top" ? paddingTop : paddingBottom) || 0;
    }
    // Pages and nav-stacks: ion-content padding
    const pagePadding = getComputedStyle(element).getPropertyValue(
      side === "top" ? "--padding-top" : "--padding-bottom"
    );
    return parseFloat(pagePadding) || 0;
  }
}
