import { Component, Input, OnInit } from "@angular/core";
import { PLHAnimations } from "src/app/shared/animations";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { PLHDataService } from "src/app/shared/services/data/data.service";
import { TemplateBaseComponent } from "../base";

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
        background-color: var(--ion-primary-color, #0d3f60);
        margin: 10px;
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
    this.addParentActionsInterceptor();
  }

  /**
   * Action emitted by child rows will by default be handled by the parent template
   * Intercept completed/uncompleted actions to only emit if all sections completed
   */
  private addParentActionsInterceptor() {
    console.log("templateNames", this.templateNames);
    this.parent.handleActionsInterceptor = async (actions) => {
      return actions.filter((action) => {
        const { action_id, args } = action;
        // only allow actions to be processed by parent if last section
        if (action_id === "emit" && args[0] === "completed") {
          console.log("intercepting actions", this.sectionIndex, this.templateNames.length);
          if (this.sectionIndex < this.templateNames.length - 1) {
            this.sectionIndex++;
            return false;
          }
        }
        if (action_id === "emit" && args[0] === "uncompleted") {
          console.log("intercepting actions");
          if (this.sectionIndex > 0) {
            this.sectionIndex--;
            return false;
          }
        }
        // default process on parent
        return true;
      });
    };
  }

  goToSection(index: number) {
    this.sectionIndex = index;
  }
}
