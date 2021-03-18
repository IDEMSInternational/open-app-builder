import {Component, OnInit} from '@angular/core';
import {TemplateBaseComponent} from "../base";
import {ITemplateRowProps} from "../../models";
import {getStringParamFromTemplateRow} from "../../../../utils";

@Component({
    selector: 'plh-tile-component',
    templateUrl: './tile-component.component.html',
    styleUrls: ['./tile-component.component.scss'],
})
export class TmplTileComponentComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
    first_line_text: string | null;
    second_line_text: string | null;
    icon_src: string | null;
    value: any;
    style: string | null;

    constructor() {
        super();
    }

    ngOnInit() {
        this.getParams();
    }

    getParams() {
        this.first_line_text = getStringParamFromTemplateRow(this._row, 'first_line_text', null);
        this.second_line_text = getStringParamFromTemplateRow(this._row, 'second_line_text', null);
        this.icon_src = getStringParamFromTemplateRow(this._row, 'icon_src', null);
        this.value = this._row.value;
        this.style = getStringParamFromTemplateRow(this._row, 'style', 'quick_start');
    }
}
