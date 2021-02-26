import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { ITemplateComponent } from "./tmpl.component";

@Component({
    selector: "plh-tmpl-nav-group",
    template: `<div class="nav-group">
        <plh-tmpl-comp
            [row]="row?.rows[sectionIndex]"
            [template]="template"
            [localVariables]="localVariables"
        ></plh-tmpl-comp>
        <ion-button *ngIf="sectionIndex > 0" (click)="previousClicked()">Previous</ion-button>
        <ion-button *ngIf="sectionIndex + 1 < row.rows.length" (click)="nextClicked()">Next</ion-button>
    </div>`
})
export class NavGroupComponent implements ITemplateComponent {
    sectionIndex = 0;
    @Input() row: FlowTypes.TemplateRow;
    @Input() template: FlowTypes.Template;
    @Input() localVariables: { [name: string]: any };

    nextClicked() {
        if (this.sectionIndex + 1 < this.row.rows.length) {
            this.sectionIndex++;
        }
    }

    previousClicked() {
        if (this.sectionIndex > 0) {
            this.sectionIndex--;
        }
    }
}