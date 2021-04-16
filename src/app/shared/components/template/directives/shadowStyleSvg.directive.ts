import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Directive({
  selector: "ion-icon[src][appendStyleSvg]",
})
export class appendStyleSvgDirective implements AfterViewInit, OnDestroy {
  private _styles?: HTMLStyleElement;
  @Input("isCustomIcon") isCustomIcon: boolean = false;
  private get ionIconShadowDom() {
    return (this.element.nativeElement as HTMLElement).shadowRoot;
  }
  private readonly isBrowser: boolean;
  private get noStyles() {
    if (!this._styles) {
      this._styles = document.createElement("style");
      this._styles.innerHTML = `
      svg,
      .icon-inner {
        width: auto!important;
        height: auto!important;
      }`;
    }

    return this._styles;
  }

  constructor(private element: ElementRef, @Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.isCustomIcon) {
      this.applyStyles().then();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser && this.isCustomIcon) {
      this.removeStyles();
    }
  }

  private applyStyles() {
    return Promise.resolve().then(() => this.ionIconShadowDom.appendChild(this.noStyles));
  }

  private removeStyles() {
    this.ionIconShadowDom.removeChild(this.noStyles);
  }
}
