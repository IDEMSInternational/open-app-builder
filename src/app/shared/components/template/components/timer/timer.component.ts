import {ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from "@angular/core";
import {FlowTypes} from 'src/app/shared/model/flowTypes';
import {getNumberParamFromTemplateRow, getStringParamFromTemplateRow} from "../../../../utils";
import {ITemplateComponent} from "../tmpl.component";
import {PickerController} from "@ionic/angular";

@Component({
    selector: 'plh-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements ITemplateComponent, OnInit {
    @Input() row: FlowTypes.TemplateRow;
    @Input() template: FlowTypes.Template;
    @Input() localVariables: { [name: string]: any };
    @ViewChild('min', {static: false}) minInput: ElementRef;
    @ViewChild('sec', {static: false}) secInput: ElementRef;
    state: TimerState;
    defaultTime: number = 10;
    leftButtonAction: string;
    leftButtonIcon: string;
    leftButtonName: string;
    rightButtonAction: string;
    rightButtonIcon: string;
    rightButtonName: string;
    isTimerEditable: boolean;
    timerDurationExtension: number = 1 * 60;
    help: string | null = null;
    leftButton: FlowTypes.TemplateRow;
    rightButton: FlowTypes.TemplateRow;
    title: string;
    _value: number;
    minutes: string;
    seconds: string;
    timeValues = () => {
        const data = [];
        for (let i = 0; i <= 59; i++) {
            data.push(i < 10 ? `0${i}` : i)
        }
        return [data, data];
    }

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

    constructor(public pickerController: PickerController) {
        this.changeState(new PlayingState(this));
    }

    ngOnInit() {
        this.value = this.row.value || 60 * 10;
        this.getParams()
        this.state.callOnInit();
        // TODO: add help logic
        // this.help = '';
    }

    changeState(state: TimerState) {
        this.state = state;
        this.leftButton = this.generateButtonTemplateRow(this.leftButtonIcon, this.leftButtonName);
        this.rightButton = this.generateButtonTemplateRow(this.rightButtonIcon, this.rightButtonName);
    }

    getParams() {
        this.title = getStringParamFromTemplateRow(this.row, 'title', "Timer");
        this.help = getStringParamFromTemplateRow(this.row, 'help', null);
        console.log(this.help);
        this.timerDurationExtension = getNumberParamFromTemplateRow(this.row, 'timer_duration_extension', 60);
    }

    clickLeftButton() {
        this.state.clickLeftButton();
    }

    clickRightButton() {
        this.state.clickRightButton();
    }

    editTimer(val: string, type: 'mm' | 'ss') {
        return type === 'mm' && parseInt(val, 10) > 59 || type === 'ss' && parseInt(val, 10) > 59
            ? this.state.editTimer(type === 'mm' ? this.defaultTime.toString() : '00', type)
            : this.state.editTimer(val, type)
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

    openPicker() {
        const numColumns = 2;
        const numOptions = 60;
        const columnOptions = this.timeValues();
        this.pickerController.create({
            columns: this.getColumns(numColumns, numOptions, columnOptions,),
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.state.clickLeftButton();
                    }
                },
                {
                    text: 'Confirm',
                    handler: (value) => {
                        const min = Object.values(value['col-0']).toString().split(',')[0].trim();
                        const sec = Object.values(value['col-1']).toString().split(',')[0].trim();
                        this.state.editTimer(min, 'mm');
                        this.state.editTimer(sec, 'ss');
                        console.log(`Got value ${min}:${sec}`);
                    }
                }
            ]
        }).then(e => {
            if (!this.isTimerEditable) {
                this.state.clickLeftButton();
            }
            return e.present();
        })
    }

    getColumns(numColumns, numOptions, columnOptions) {
        let columns = [];
        for (let i = 0; i < numColumns; i++) {
            columns.push({
                name: `col-${i}`,
                options: this.getColumnOptions(i, numOptions, columnOptions),
                selectedIndex: i === 0 ? this.minutes : this.seconds
            });
        }
        return columns;
    }

    getColumnOptions(columnIndex, numOptions, columnOptions) {
        let options = [];
        for (let i = 0; i < numOptions; i++) {
            options.push({
                text: columnOptions[columnIndex][i % numOptions],
                value: i,
            })
        }
        return options;
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
    constructor(public timer: TimerComponent) {
    }

    clickLeftButton() {
    }

    clickRightButton() {
    }

    clickTimer() {
    }

    editTimer(val: string, type: 'mm' | 'ss') {
    }

    callOnInit() {
    }
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
        this.timer.value = this.timer.row.value ? this.timer.row.value : this.timer.defaultTime * this.timer.timerDurationExtension;
    }

    editTimer(val: string, type: 'mm' | 'ss') {
        val = val.replace(/^0/, '');
        let valNumber = Number.parseInt(val);

        if (Number.isNaN(valNumber)) return;

        if (type === 'mm') {
            this.timer.minInput.nativeElement.value = val;
            this.timer.value = valNumber * 60 + Number(this.timer.seconds.replace(/^0/, ''));
        } else if (type === 'ss') {
            this.timer.secInput.nativeElement.value = val;
            this.timer.value = valNumber + Number(this.timer.minutes.replace(/^0/, '')) * 60;
        }
    }
}
