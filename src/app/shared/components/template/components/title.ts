import {Component, OnInit} from "@angular/core";
import {TemplateBaseComponent} from "./base";
import {ITemplateRowProps} from "../models";
import {getStringParamFromTemplateRow} from "../../../utils";

@Component({
    selector: "plh-tmpl-title",
    template: `
        <div class="title-wrapper">
            <h1>{{ _row.value }}</h1>
            <ion-icon *ngIf="help"
                      name="help-circle-outline"
                      class="timer-help" [pTooltip]="help"
                      [tooltipPosition]="tooltipPosition"
                      tooltipEvent="click"></ion-icon>
        </div>
    `,
    styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTitleComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
    help: string | null;
    tooltipPosition: string;

    constructor() {
        super();
    }

    ngOnInit() {
        this.getParams();
    }

    getParams() {
        this.help = getStringParamFromTemplateRow(this._row, 'help', null);
        this.tooltipPosition = getStringParamFromTemplateRow(this._row, 'tooltipPosition', 'right');
    }
}
