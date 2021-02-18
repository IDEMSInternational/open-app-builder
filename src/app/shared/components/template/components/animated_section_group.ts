import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { ITemplateComponent } from "./tmpl.component";

@Component({
    selector: "plh-tmpl-animated-section-group",
    template: `<div class="animated-section-group">
        <plh-tmpl-comp
            *ngFor="let childRow of row.rows"
            [row]="childRow"
            [template]="template"
            [localVariables]="localVariables"
        ></plh-tmpl-comp>
    </div>`
})
export class AnimatedSectionGroupComponent implements ITemplateComponent {
    @Input() row: FlowTypes.TemplateRow;
    @Input() template: FlowTypes.Template;
    @Input() localVariables: { [name: string]: any };
}