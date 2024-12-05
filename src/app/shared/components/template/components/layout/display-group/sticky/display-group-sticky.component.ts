import {
  AfterViewInit,
  Component,
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
  height = signal(0);

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
    // In the case of a sticky header, the top padding/margin of the main app content and template container need to be accounted for,
    // now that the display group sits at the very top of the content window outside of the main content and template container
    const [{ contentRect }] = entries;
    this.height.set(contentRect.height);
  }
}
