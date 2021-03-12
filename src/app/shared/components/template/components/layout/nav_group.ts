import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { PLHDataService } from "src/app/shared/services/data/data.service";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-nav-group",
  template: `<div class="nav-group">
    <div class="nav-progress">
      <div
        *ngFor="let templateName of templateNames; index as i"
        class="nav-progress-part"
        [ngClass]="{'seen': i <= sectionIndex}">
      </div>
    </div>
    <div class="nav-section" *ngFor="let templateName of templateNames; index as i">
      <plh-template-container
        *ngIf="sectionIndex === i"
        [name]="templateName"
        [parent]="parent"
      >
      </plh-template-container>
    </div>
  </div>`,
  styles: [
    `
      .slide {
        width: 95vw;
      }

      .nav-buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }

      .nav-progress {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .nav-progress-part {
        height: 5px;
        flex-grow: 1;
        background-color: var(--ion-primary-color, #0D3F60);
        margin: 10px;
        max-width: 40px;
      }

      .nav-progress-part.seen {
        background-color: var(--ion-primary-color, #F88923);
      }

      ion-button {
        --border-radius: 20px;
        --background: linear-gradient(to bottom, #ffb833 28.12%, #f88923 100%);
      }
    `,
  ],
})
export class NavGroupComponent extends TemplateBaseComponent implements OnInit {
  templateNames: string[] = [];
  sectionIndex = 0;

  @Input() set row(value: FlowTypes.TemplateRow) {
    this._row = value;
    if (value && value.value && typeof value.value === "string") {
      this.templateNames = this.splitLines(value.value);
    }
  }

  constructor(dataService: PLHDataService) {
    super();
  }

  private splitLines(input: string) {
    return input
      .replace("\n", ";")
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  ngOnInit() {
    this.parent.handleActionsCallback = async (actions, results) => {
      console.log("parent handled actions", actions, results);
      const completedAction = actions.find((a) => a.action_id === "emit" && a.args[0] === "completed");
      const uncompletedAction = actions.find((a) => a.action_id === "emit" && a.args[0] === "uncompleted");

      if (completedAction) {
        this.nextSection();
      } else if (uncompletedAction) {
        this.previousSection();
      }
    };
  }

  nextSection() {
    if (this.sectionIndex + 1 < this.templateNames.length) {
      this.sectionIndex++;
    } else {
      console.log("Nav group completed?");
    }
  }

  previousSection() {
    if (this.sectionIndex > 0) {
      this.sectionIndex--;
    }
  }
}
