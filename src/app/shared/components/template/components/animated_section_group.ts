import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";

@Component({
    selector: "plh-tmpl-animated-section-group",
    template: `<div class="animated-section-group">
        <plh-tmpl-comp-host
            *ngFor="let childRow of row.rows"
            [row]="childRow"
            [template]="template"
            [localVariables]="localVariables"
        ></plh-tmpl-comp-host>
    </div>`
})
export class AnimatedSectionGroupComponent {
    @Input() row: FlowTypes.TemplateRow;
    @Input() template: FlowTypes.Template;
    @Input() localVariables: { [name: string]: string };
}