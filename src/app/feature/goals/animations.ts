import { trigger, state, style, animate, transition } from "@angular/animations";

/**
 * An expandable section (accordion-style). Trigger open/close state to show content,
 * Used to expand sections of past/future reminders
 * 2020-11-16 (Chris) - Currently deprecated but retaining for future use
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
