import { trigger, state, style, animate, transition } from "@angular/animations";

/**
 * An expandable section (accordion-style). Trigger open/close state to show content
 */
export const OpenClose = trigger("OpenClose", [
  state(
    "open",
    style({
      height: "*",
      opacity: 1,
    })
  ),
  state(
    "closed",
    style({
      height: "0",
      opacity: 0,
    })
  ),
  transition("open => closed", [animate("0.2s ease-in")]),
  transition("closed => open", [animate("0.3s ease-out")]),
]);
