import { animate, state, style, transition, trigger } from "@angular/animations";

const fadeInOut = [
  trigger("fadeInOut", [
    state("in", style({ opacity: 1 })),
    state("out", style({ opacity: 0 })),
    // when fading in include 1s delay for previous animations to complete
    transition("* => in", [animate("0.5s 1s")]),
    transition("in => out", [animate("0.5s")]),
    // todo - could use :enter and :exit properties also (need to confirm doesn't break existing functionality)
  ]),
];

const fadeEntryExit = [
  trigger("fadeEntryExit", [
    transition(":enter", [style({ opacity: 0 }), animate("0.7s 0.3s", style({ opacity: 1 }))]),
    transition(":leave", [animate("0.3s", style({ opacity: 0 }))]),
  ]),
];

export const PLHAnimations = { fadeInOut, fadeEntryExit };
