import { Component, Input, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { COMPONENT_DEFAULTS, PLHDataService } from "src/app/shared/services/data/data.service";
import { ITemplateComponent } from "./tmpl.component";


@Component({
    selector: "plh-tmpl-nav-group",
    template: `<div class="nav-group">
        <div *ngFor="let childRow of _row?.rows; let i = index" class="slide" [hidden]="i != sectionIndex">
            <plh-tmpl-comp
                [row]="childRow"
                [template]="template"
                [localVariables]="localVariables"
            ></plh-tmpl-comp>
        </div>
        <div class="nav-buttons">
            <ion-button *ngIf="sectionIndex > 0" (click)="backClicked()">{{navButtonList[sectionIndex].back}}</ion-button>
            <ion-button *ngIf="sectionIndex + 1 < _row?.rows?.length" (click)="nextClicked()">{{navButtonList[sectionIndex].next}}</ion-button>
            <ion-button *ngIf="navButtonList[sectionIndex].showSkip && sectionIndex + 1 < _row?.rows?.length" (click)="skipClicked()">
                {{navButtonList[sectionIndex].skip}}
            </ion-button>
            <ion-button *ngIf="navButtonList[sectionIndex].finish && sectionIndex + 1 == _row?.rows?.length" (click)="finishClicked()">
                {{navButtonList[sectionIndex].finish}}
            </ion-button>
        </div>
        <p>Section {{sectionIndex}}</p>
    </div>`,
    styles: [
        `.slide {
            width: 95vw;
        }
        
        .nav-buttons {
            width: 100%;
            display: flex;
            justify-content: center;
        }

        ion-button {
            --border-radius: 20px;
            --background: linear-gradient(to bottom, #FFB833 28.12%, #F88923 100%);
        }
        `
    ]
})
export class NavGroupComponent implements ITemplateComponent {
    
    defaultParamMap: Record<string, any>;

    constructor(dataService: PLHDataService) {
        this.defaultParamMap = dataService.getComponentDefaultParamMap("nav_group");
    }

    private getParamFromMap(paramMap: Record<string, any>, name: string) {
        return paramMap[name] ? paramMap[name] : this.defaultParamMap[name];
    }

    sectionIndex = 0;
    navButtonList: NavButtons[] = [];
    _row: FlowTypes.TemplateRow;
    @Input() set row(value: FlowTypes.TemplateRow) {
        const paramMap = this.extractParameterList(value.parameter_list);
        
        let groupNextText = this.getParamFromMap(paramMap, "next_button_text");
        let groupBackText = this.getParamFromMap(paramMap, "back_button_text");
        let groupSkipText = this.getParamFromMap(paramMap, "skip_button_text");
        let groupFinishText = this.getParamFromMap(paramMap, "finish_button_text");
        let groupShowSkip = this.getParamFromMap(paramMap, "show_skip_button");
        let groupShowBack = this.getParamFromMap(paramMap, "show_back_button");
        if (value && value.rows) {
            this.navButtonList = value.rows.map((row) => {
                const paramMap = this.extractParameterList(row.parameter_list);
                let next = paramMap.next_button_text ? paramMap.next_button_text : groupNextText;
                let back = paramMap.back_button_text ? paramMap.back_button_text : groupBackText;
                let skip = paramMap.skip_button_text ? paramMap.skip_button_text : groupSkipText;
                let finish = paramMap.finish_button_text ? paramMap.finish_button_text : groupFinishText;
                let showSkip = groupShowSkip;
                if (paramMap.show_skip_button + "" == "true") {
                    showSkip = true;
                }
                let showBack = groupShowBack;
                if (paramMap.show_back_button + "" == "true") {
                    showBack = true;
                }
                return {
                    next: next,
                    back: back,
                    skip: skip,
                    finish: finish,
                    showSkip: showSkip,
                    showBack: showBack
                };
            });
        }

        this._row = value;
    }
    @Input() template: FlowTypes.Template;
    @Input() localVariables: { [name: string]: any };

    @ViewChild("slides") slides: IonSlides;

    nextClicked() {
        if (this.sectionIndex + 1 < this._row.rows.length) {
            this.sectionIndex++;
        }
        // this.slides.slideNext();
    }

    backClicked() {
        if (this.sectionIndex > 0) {
            this.sectionIndex--;
        }
        // this.slides.slidePrev();
    }

    skipClicked() {

    }

    finishClicked() {

    }

    extractParameterList(params: string[]): Record<string, string> {
        let paramMap = {};
        if (!params || !params.length) {
            return {};
        }
        for (let param of params) {
            let parts = param.split(":");
            if (parts.length >= 2) {
                paramMap[parts[0]] = parts[1];
            }
        }
        return paramMap;
    }
}


type NavButtons = {
    next: string;
    back: string;
    skip: string;
    finish: string;
    showSkip: boolean;
    showBack: boolean;
}