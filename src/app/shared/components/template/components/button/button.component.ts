import {Component, OnInit} from '@angular/core';

import { getStringParamFromTemplateRow, getBooleanParamFromTemplateRow, getNumberParamFromTemplateRow } from "../../../../utils";
import { TemplateBaseComponent } from "../base";

@Component({
    selector: 'plh-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class TmplButtonComponent extends TemplateBaseComponent implements OnInit {
    color: string = 'primary';
    hexBgColor: string | null;
    disabled: boolean = false;
    height: number;
    widthPx: number;
    widthPercent: number;
    constructor() {
        super();
    }

    ngOnInit() {
        this.getParams();
    }

    getParams() {
            this.color = getStringParamFromTemplateRow(this._row, 'color',  'primary');
            this.hexBgColor = getStringParamFromTemplateRow(this._row, 'hexBgColor', null);
            this.widthPx = getNumberParamFromTemplateRow(this._row, 'widthPx', null);
            this.widthPercent = getNumberParamFromTemplateRow(this._row, 'widthPercent', 100);
            this.disabled = getBooleanParamFromTemplateRow(this._row, 'disabled', false);
    }
}
