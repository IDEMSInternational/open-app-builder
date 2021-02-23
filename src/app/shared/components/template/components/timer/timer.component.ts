import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";
import { ITemplateComponent } from "../tmpl.component";

@Component({
  selector: 'plh-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements ITemplateComponent, OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };

  title: string;
  value: number;
  timerDurationExtension: number =  1 * 60;
  help: string | null = null;

  status: 'paused' | 'running' | 'finished' = 'paused';
  actions = ['pause', 'run', 'refresh', 'increase'];
  leftButtons: FlowTypes.TemplateRow[] = [];
  rightButtons: FlowTypes.TemplateRow[] = [];
  currLeftButton: FlowTypes.TemplateRow;
  currRightButton: FlowTypes.TemplateRow;
  
  ngOnInit() {
    this.value = this.row.value;
    this.title = getStringParamFromTemplateRow(this.row, 'title', "Timer");
    this.timerDurationExtension = getNumberParamFromTemplateRow(this.row, 'timer_duration_extension', 10 * 60);
    // TODO: add help logic
    // this.help = '';

    this.currLeftButton = this.generateButtonTemplateRow('ass', 'at-circle-outline', 'asdad');
    
  }

  private generateButtonTemplateRow(action: string, value: string, name: string): FlowTypes.TemplateRow {
    return {
      "type": "round_button",
      "name": name,
      "value": value,
      "comments": "",
      "action_list": [action]
    }
  }
}
