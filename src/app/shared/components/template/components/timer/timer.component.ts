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

  state: TimerState;

  leftButtonAction: string;
  leftButtonIcon: string;
  leftButtonName: string;
  rightButtonAction: string;
  rightButtonIcon: string;
  rightButtonName: string;
  isTimerEditable: boolean;
  timerDurationExtension: number =  1 * 60;
  help: string | null = null;
  leftButton: FlowTypes.TemplateRow;
  rightButton: FlowTypes.TemplateRow;
  title: string;
  _value: number;
  minutes: string;
  seconds: string;
  
  get value() {
    return this._value;
  }

  set value(val: number) {
    if (!val) val = 0;
    
    this._value = val;

    const _seconds = val % 60;
    const _minutes = Math.floor(val / 60);
    this.seconds = _seconds < 10 ? `0${_seconds}` : String(_seconds);
    this.minutes = _minutes < 10 ? `0${_minutes}` : String(_minutes);
  }
  
  constructor() {
    this.changeState(new PlayingState(this));
  }

  ngOnInit() {
    this.value = this.row.value || 60 * 10;
    this.title = getStringParamFromTemplateRow(this.row, 'title', "Timer");
    this.timerDurationExtension = getNumberParamFromTemplateRow(this.row, 'timer_duration_extension', 60);
    this.state.callOnInit();
    // TODO: add help logic
    // this.help = '';  
  }

  changeState(state: TimerState) { 
    this.state = state;
    this.leftButton = this.generateButtonTemplateRow(this.leftButtonIcon, this.leftButtonName);
    this.rightButton = this.generateButtonTemplateRow(this.rightButtonIcon, this.rightButtonName);
  }
  

  clickLeftButton() { 
    this.state.clickLeftButton();
  }

  clickRightButton() { 
    this.state.clickRightButton();
  }  

  editTimer(val: string, type: 'mm' | 'ss') {
   this.state.editTimer(val, type);
  }

  generateButtonTemplateRow(value: string, name: string): FlowTypes.TemplateRow {
    return {
      "type": "round_button",
      "name": name,
      "value": value,
      "comments": "",
      "action_list": []
    }
  }
}


interface TimerState {
  timer: TimerComponent;
  clickLeftButton(): void;
  clickRightButton(): void;
  editTimer(val: string, type: 'mm' | 'ss'): void;
  callOnInit(): void;
}

abstract class State {
  constructor(public timer: TimerComponent) { }

  clickLeftButton() { }
  clickRightButton() { }
  editTimer(val: string, type: 'mm' | 'ss') { }
  callOnInit() { }
}
class PlayingState extends State {
  private intervalRef;

  constructor(timer: TimerComponent) {
    super(timer);

    this.timer.leftButtonAction = 'pause';
    this.timer.leftButtonIcon = 'pause-outline';
    this.timer.leftButtonName = 'pause_timer'
    this.timer.rightButtonAction = 'increase';
    this.timer.rightButtonIcon = 'reload-outline';
    this.timer.rightButtonName = 'increase_timer';
    this.timer.isTimerEditable = false;
    this.countDown();
  }

  clickLeftButton() {
    clearInterval(this.intervalRef);
    this.timer.changeState(new PausedState(this.timer));
  }

  clickRightButton() {
    this.timer.value += this.timer.timerDurationExtension;
  }

  countDown() {
    this.intervalRef = setInterval(() => {
      if (this.timer.value === 0) {
        clearInterval(this.intervalRef);
        this.timer.changeState(new PausedState(this.timer));
        return;
      }

      this.timer.value -= 1;

    }, 1000);
  }
}

class PausedState extends State {
  constructor(timer: TimerComponent) {
    super(timer);

    this.timer.leftButtonAction = 'play';
    this.timer.leftButtonIcon = 'play-outline';
    this.timer.leftButtonName = 'play_timer'
    this.timer.rightButtonAction = 'refresh';
    this.timer.rightButtonIcon = 'sync-outline';
    this.timer.rightButtonName = 'refresh_timer';
    this.timer.isTimerEditable = true;
  }

  clickLeftButton() {
    this.timer.changeState(new PlayingState(this.timer));
  }

  clickRightButton() {
    this.timer.value = this.timer.row.value;
  }

  editTimer(val: string, type: 'mm' | 'ss') {
    val = val.replace(/^0/, '');
    let valNumber = Number.parseInt(val);
    
    if (Number.isNaN(valNumber)) return;

    if (type === 'mm') {
      this.timer.value = valNumber * 60 + Number(this.timer.seconds.replace(/^0/, ''));
    } else if (type === 'ss') {
      this.timer.value = valNumber + Number(this.timer.minutes.replace(/^0/, '')) * 60;
    }
  }
}