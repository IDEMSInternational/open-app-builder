import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { ITemplateComponent } from "./tmpl.component";

@Component({
    selector: "plh-tmpl-animated-section",
    template: `<div class="animated-section">
        <plh-tmpl-comp
            *ngFor="let childRow of row.rows"
            [row]="childRow"
            [template]="template"
            [localVariables]="localVariables"
        ></plh-tmpl-comp>
    </div>`
})
export class AnimatedSectionComponent implements ITemplateComponent {
    @Input() row: FlowTypes.TemplateRow;
    @Input() template: FlowTypes.Template;
    @Input() localVariables: { [name: string]: any };
}