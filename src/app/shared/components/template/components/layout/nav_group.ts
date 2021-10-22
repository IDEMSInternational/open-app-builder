import { Component } from "@angular/core";
import { PLHAnimations } from "src/app/shared/animations";
import { FlowTypes } from "data-models";
import { hackAddRowWithDefaultActions } from "../../hacks";
import { TemplateService } from "../../services/template.service";
import { TemplateLayoutComponent } from "./layout";

@Component({
  selector: "plh-tmpl-nav-group",
  animations: PLHAnimations.fadeEntryExit,
  template: ` <div class="nav-group">
    <div class="nav-progress">
      <div
        *ngFor="let templateName of templateNames; index as i"
        class="nav-progress-part"
        [ngClass]="{ seen: i <= sectionIndex }"
        (click)="goToSection(i)"
      ></div>
    </div>
    <ng-template ngFor let-i="index" let-templateName [ngForOf]="templateNames">
      <div class="nav-section" [class.selected]="sectionIndex === i">
        <div *ngIf="sectionIndex === i" @fadeEntryExit>
          <plh-template-container
            [name]="templateName"
            [templatename]="templateName"
            [parent]="parent"
            [row]="containerRow"
          >
          </plh-template-container>
        </div>
      </div>
    </ng-template>
  </div>`,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }

      .slide {
        width: 95vw;
      }

      .nav-group {
        height: calc(100% - 27px);
      }

      .nav-buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }

      .selected {
        height: 100%;
      }

      .nav-progress {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: var(--small-padding) 0;
      }

      .nav-section :nth-child(1) {
        height: 100%;
      }

      .nav-progress-part {
        height: 7px;
        flex: 1;
        margin: 0 2px;
        background-color: var(--ion-primary-color, #0d3f60);
        border-radius: var(--ion-border-radius-standard);
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
  sectionIndex: number;
  sectionMaximumIndex: number | string;
  sectionMaxiumumPercentage: unknown;

  /** Temp row to pass emit completed/uncompleted actions to parent */
  containerRow = hackAddRowWithDefaultActions();

  constructor(private templateService: TemplateService) {
    super();
  }

  modifyRowSetter(row: FlowTypes.TemplateRow) {
    if (Array.isArray(row?.value)) {
      this.templateNames = row.value;
      row._debug_name = this.templateNames[this.sectionIndex];
      // only set the active section the first time value received
      // (handle via goToSection method internally for other cases)
      if (!this.sectionIndex) {
        this.sectionIndex = this.getActiveSectionIdx(row?.parameter_list?.progress_field);
        this.sectionMaximumIndex = this.getMaximumSectionIdx(
          row.parameter_list["max_progress_field"]
        );
        this.sectionMaxiumumPercentage = this.getMaximumProgressPercentage(
          row.parameter_list["max_progress_field"],
          row?.parameter_list?.progress_field
        );
      }
    }
    return row;
  }

  interceptTemplateContainerAction(action: FlowTypes.TemplateRowAction) {
    const { action_id, args } = action;
    // only allow actions to be processed by parent if last section
    if (action_id === "emit" && args[0] === "completed") {
      if (this.sectionIndex < this.templateNames.length - 1) {
        this.goToSection(this.sectionIndex + 1);
        return false;
      }
    }
    if (action_id === "emit" && args[0] === "uncompleted") {
      if (this.sectionIndex > 0) {
        this.goToSection(this.sectionIndex - 1).then();
        return false;
      }
    }
    // default process on parent
    return true;
  }

  /**
   * Function that will return Current Slider Index
   * @param progressField
   */
  getActiveSectionIdx(progressField: string): number {
    let result: number;
    const currentProgress = this.templateService.getField(progressField);
    if (+currentProgress === 100) {
      result = 0;
      this.templateService.setField(progressField, `${result}`);
      return result;
    }
    result = Math.floor((currentProgress * this.templateNames.length) / 100 - 1);
    return result > 0 ? result : 0;
  }

  /**
   * Function that will move forward or back to Section
   * @param index
   */
  async goToSection(index: number) {
    this.sectionIndex = index;
    this.scrollToTop();
    this._row._debug_name = this.templateNames[index];
    await this.updateSectionProgress();
  }

  /**
   * Function to Update Progress of Stepper
   */
  async updateSectionProgress() {
    //update the field provided in progress_variable to be equal to the max of it's current value
    //and the percentage of this.sectionIndex from this.templateNames.length. the value should
    //be an integer between 0 and 100 inclusive.
    const progressField = this._row.parameter_list["progress_field"];
    const progressFieldMaximum = this._row.parameter_list["max_progress_field"];

    if (progressField && progressField.indexOf("{{") < 0) {
      const currentPercentDone = Math.ceil(
        ((this.sectionIndex + 1) / this.templateNames.length) * 100
      );

      const previousPercentDone = Number.parseInt(this.templateService.getField(progressField));
      let maximumPercentDone: Number;
      this.sectionMaxiumumPercentage = Math.max(
        currentPercentDone,
        this.sectionMaxiumumPercentage as number
      );

      if (previousPercentDone && !isNaN(previousPercentDone)) {
        maximumPercentDone = Math.max(currentPercentDone, previousPercentDone);
        if (maximumPercentDone > this.sectionMaxiumumPercentage) {
          this.sectionMaxiumumPercentage = maximumPercentDone;
          this.templateService.setField(progressFieldMaximum, maximumPercentDone.toString());
        } else {
          this.templateService.setField(
            progressFieldMaximum,
            this.sectionMaxiumumPercentage.toString()
          );
        }
      }

      await this.parent.handleActions(
        [
          {
            action_id: "set_field",
            args: [progressField, "" + currentPercentDone],
            trigger: "completed",
            _triggeredBy: this._row,
          },
          {
            action_id: "set_field",
            args: [progressFieldMaximum, "" + this.sectionMaxiumumPercentage],
            trigger: "completed",
            _triggeredBy: this._row,
          },
        ],
        this._row
      );
    } else {
      console.warn("No progress field", progressField);
    }
  }

  /**
   * Function that will return the maximum Slider Index that Stepper ever achieved
   * @param parameterListElement
   * @private
   */
  private getMaximumSectionIdx(parameterListElement: string) {
    let result: number;
    const maximumProgress = parseFloat(this.templateService.getField(parameterListElement));
    result = Math.floor((maximumProgress * this.templateNames.length) / 100 - 1);
    return result > 0 ? result : 0;
  }

  /**
   *
   * @param parameterListElement
   * @param progress_field
   * @private
   */
  getMaximumProgressPercentage(parameterListElement: string, progress_field: string | undefined) {
    let getPercentage = this.templateService.getField(parameterListElement);
    let getPercentageSecondary = this.templateService.getField(progress_field);
    return getPercentage > 0 ? getPercentage : getPercentageSecondary ? getPercentageSecondary : 0;
  }
}
