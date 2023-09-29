import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { TemplateLayoutComponent } from "./layout";

@Component({
  selector: "plh-tmpl-animated-section",
  template: `
    <plh-template-component
      *ngFor="let childRow of _row.rows | filterDisplayComponent; trackBy: trackByRow"
      [row]="childRow"
      [parent]="parent"
      [@fadeSection]="_row?.hidden ? 'out' : 'in'"
    ></plh-template-component>
  `,
  animations: [
    // HACK - rough copy of shared fadeInOut method
    // Would work better if all sections grouped to apply transition across sections (support fade out as well as in)
    trigger("fadeSection", [
      state("in", style({ opacity: 1 })),
      state("out", style({ opacity: 0 })),
      // when fading in include 1s delay for previous animations to complete
      transition("* => in", [animate("1s ease-in-out")]),
      // transition("in => out", [animate("0.3s ease-out")]),
      // TODO - fade out not possible as parent block display set to hidden before time to watch
    ]),
  ],
  styleUrls: ["./animated-section.scss"],
})
export class AnimatedSectionComponent extends TemplateLayoutComponent implements OnInit {
  ngOnInit() {
    this.parent.templateActionService.handleActionsCallback = async () => {
      // Temporary workaround to always scroll to top after actions triggered within animated section (uncomment)
      // this.scrollToTop();
    };
  }
}
