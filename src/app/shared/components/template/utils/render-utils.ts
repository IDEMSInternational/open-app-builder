import { ElementRef } from "@angular/core";

/**
 * Find the nearest ion-content element and inspect shadow root
 * to get scrollTop of main element
 */
export function getIonContentScrollTop(elRef: ElementRef) {
  const nativeElement: HTMLElement = elRef.nativeElement;
  const contentEl = nativeElement.closest("ion-content");
  return contentEl?.shadowRoot?.querySelector("main")?.scrollTop || 0;
}

/**
 * Find the nearest ion-content element and inspect shadow root
 * to set scrollTop on main element
 */
export function setIonContentScrollTop(elRef: ElementRef, value: number) {
  const nativeElement: HTMLElement = elRef.nativeElement;
  const contentEl = nativeElement.closest("ion-content");
  const targetEl = contentEl?.shadowRoot?.querySelector("main");
  if (targetEl) {
    targetEl.scrollTop = value;
  }
}

/** Set a style property for a target element **/
export function setElStyle(
  elRef: ElementRef,
  property: Extract<keyof CSSStyleDeclaration, string>,
  value: string | number
) {
  const el: HTMLElement = elRef.nativeElement;
  el.style.setProperty(property, `${value}`);
}

/**
 * Minimal implementation of JS animation, to provide simple linear transitions
 * of numeric properties, such as opacity
 */
export function setElStyleAnimated(
  elRef: ElementRef,
  property: Extract<keyof CSSStyleDeclaration, string>,
  value: number,
  animateOpts?: { duration: number }
) {
  const el: HTMLElement = elRef.nativeElement;
  return new Promise((resolve) => {
    const { duration } = animateOpts;
    const fps = 60;
    const totalFrames = Math.ceil((duration / 1000) * fps);

    // find the current computed value to include default values as well as set css
    const initialVal = Number(window.getComputedStyle(el).getPropertyValue(property));
    const diff = value - initialVal;
    const delta = diff / totalFrames;
    let i = 0;

    // run the animation
    // TODO - could use animation frame request instead
    // https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    const animation = setInterval(() => {
      if (i === totalFrames) {
        clearInterval(animation);
        resolve();
      } else {
        i++;
        el.style.setProperty(property, `${initialVal + i * delta}`);
      }
    }, 1000 / fps);
    return;
  });
}
