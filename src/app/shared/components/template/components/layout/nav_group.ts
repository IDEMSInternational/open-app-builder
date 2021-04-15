import { Component } from "@angular/core";
import { PLHAnimations } from "src/app/shared/animations";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { TemplateService } from "../../services/template.service";
import { TemplateLayoutComponent } from "./layout";

@Component({
  selector: "plh-tmpl-nav-group",
  animations: PLHAnimations.fadeEntryExit,
  template: `<div class="nav-group">
    <div class="nav-progress">
      <div
        *ngFor="let templateName of templateNames; index as i"
        class="nav-progress-part"
        [ngClass]="{ seen: i <= sectionIndex }"
        (click)="goToSection(i)"
      ></div>
    </div>
    <div class="nav-section" *ngFor="let templateName of templateNames; index as i">
      <div *ngIf="sectionIndex === i" @fadeEntryExit>
        <plh-template-container
          [name]="templateName"
          [templatename]="templateName"
          [parent]="parent"
        >
        </plh-template-container>
      </div>
    </div>
  </div>`,
  styles: [
    `
      :host {
        width: 100%;
      }
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
        justify-content: space-evenly;
        gap: 5px;
        padding: 10px 0;
      }

      .nav-progress-part {
        height: 5px;
        flex: 1;
        background-color: var(--ion-primary-color, #0d3f60);
        max-width: 40px;
      }

      .nav-progress-part.seen {
        background-color: var(--ion-primary-color, #f88923);
      }

      ion-button {
        --border-radius: 20px;
        --background: linear-gradient(to bottom, #ffb833 28.12%, #f88923 100%);
      }
    `,
  ],
})
export class NavGroupComponent extends TemplateLayoutComponent {
  templateNames: string[] = [];
  sectionIndex = 0;

  constructor(private templateService: TemplateService) {
    super();
  }

  modifyRowSetter(row: FlowTypes.TemplateRow) {
    if (Array.isArray(row?.value)) {
      this.templateNames = row.value;
    }
    return row;
  }

  interceptTemplateContainerAction(action: FlowTypes.TemplateRowAction) {
    const { action_id, args } = action;
    // only allow actions to be processed by parent if last section
    if (action_id === "emit" && args[0] === "completed") {
      if (this.sectionIndex < this.templateNames.length - 1) {
        this.sectionIndex++;
        this.updateSectionProgress();
        return false;
      }
    }
    if (action_id === "emit" && args[0] === "uncompleted") {
      if (this.sectionIndex > 0) {
        this.sectionIndex--;
        return false;
      }
    }
    // default process on parent
    return true;
  }

  goToSection(index: number) {
    this.sectionIndex = index;
    this.updateSectionProgress();
  }

  updateSectionProgress() {
    //update the field provided in progress_variable to be equal to the max of it's current value
    //and the percentage of this.sectionIndex from this.templateNames.length. the value should
    //be an integer between 0 and 100 inclusive.
    const progressField = this._row.parameter_list["progress_field"];
    if (progressField && progressField.indexOf("{{") < 0) {
      const currentPercentDone = Math.ceil(
        ((this.sectionIndex + 1) / this.templateNames.length) * 100
      );
      const previousPercentDone = Number.parseInt(this.templateService.getField(progressField));
      let percentDone = currentPercentDone;
      if (previousPercentDone && previousPercentDone != NaN) {
        percentDone = Math.max(currentPercentDone, previousPercentDone);
      }
      this.parent.handleActions(
        [
          {
            action_id: "set_field",
            args: [progressField, "" + percentDone],
            trigger: "completed",
            _triggeredBy: "nav_group",
          },
        ],
        "nav_group"
      );
    } else {
      console.warn("No progress field", progressField);
    }
  }
}
