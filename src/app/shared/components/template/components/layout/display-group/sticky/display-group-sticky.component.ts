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
    // The page or pop-up drops its padding on the edge the group covers, so the placeholder starts at that
    // edge (display-group-sticky.component.global.scss)
    this.height.set(contentRect.height);
  }
}
