import {Component, OnInit} from '@angular/core';

import { getStringParamFromTemplateRow, getBooleanParamFromTemplateRow } from "../../../../utils";
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
    width: string | null;
    constructor() {
        super();
    }

    ngOnInit() {
        this.getParams();
    }

    getParams() {
            this.color = getStringParamFromTemplateRow(this._row, 'color',  'primary');
            this.hexBgColor = getStringParamFromTemplateRow(this._row, 'hexBgColor', null);
            this.width = getStringParamFromTemplateRow(this._row, 'width', '100%');
            this.disabled = getBooleanParamFromTemplateRow(this._row, 'disabled', false);
    }
}
