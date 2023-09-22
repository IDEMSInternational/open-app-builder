import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FlowTypes } from "data-models";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { PickerController, Platform } from "@ionic/angular";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { AudioService } from "src/app/shared/services/audio/audio.service";
import { AudioPlayer } from "src/app/shared/services/audio/audio.player";
import { PLHAssetPipe } from "../../pipes/plh-asset.pipe";

@Component({
  selector: "plh-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.scss"],
})
export class TmplTimerComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
  _row: FlowTypes.TemplateRow;
  @Input() set row(value: FlowTypes.TemplateRow) {
    this._row = value;
  }
  @Input() template: FlowTypes.Template;
  @ViewChild("min", { static: false }) minInput: ElementRef;
  @ViewChild("sec", { static: false }) secInput: ElementRef;
  playIcon: string;
  pauseIcon: string;
  resetIcon: string;
  state: TimerState;
  leftButtonAction: string;
  leftButtonIcon: string;
  leftButtonName: string;
  rightButtonAction: string;
  rightButtonIcon: string;
  rightButtonName: string;
  isTimerEditable: boolean;
  is_editable_on_playing: boolean;
  timerStarted = false;
  timerDurationExtension: number = 1 * 60;
  help: string | null = null;
  title: string;
  _value: number;
  starting_minutes: number;
  starting_seconds: number;
  minutes: string;
  seconds: string;
  ping: string | null;
  player: AudioPlayer | null;
  timeValues = () => {
    const data = [];
    for (let i = 0; i <= 9; i++) {
      data.push(i);
    }
    return [data.slice(0, 6), data, data.slice(0, 6), data];
  };

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

  constructor(
    private pickerController: PickerController,
    private platform: Platform,
    private audioService: AudioService,
    private plhAssetPipe: PLHAssetPipe
  ) {
    super();
    this.changeState(new PausedState(this));
  }

  ngOnInit() {
    this.getParams();
    this.state.callOnInit();
    if (this.ping) {
      const pingSrc = this.plhAssetPipe.transform(this.ping);
      this.player = this.audioService.createPlayer(pingSrc);
    }
  }

  changeState(state: TimerState) {
    this.state = state;
  }

  getParams() {
    this.title = getStringParamFromTemplateRow(this._row, "title", "Timer");
    this.help = getStringParamFromTemplateRow(this._row, "help", null);
    this.ping = getStringParamFromTemplateRow(this._row, "ping", null);
    this.playIcon = this.getAssetParamFromTemplateRow("play_icon_asset", "play-outline");
    this.pauseIcon = this.getAssetParamFromTemplateRow("pause_icon_asset", "pause-outline");
    this.resetIcon = this.getAssetParamFromTemplateRow("reset_icon_asset", "sync-outline");
    this.timerDurationExtension =
      getNumberParamFromTemplateRow(this._row, "duration_extension", 1) * 60;
    this.is_editable_on_playing = getBooleanParamFromTemplateRow(
      this._row,
      "is_editable_on_playing",
      false
    );
    this.starting_minutes = getNumberParamFromTemplateRow(this._row, "starting_minutes", 10);
    this.starting_seconds = getNumberParamFromTemplateRow(this._row, "starting_seconds", 0);
    this.value = this.getDurationFromParams();
  }

  getAssetParamFromTemplateRow(parameterName: string, _default: string | null) {
    const value = getStringParamFromTemplateRow(this._row, parameterName, null);
    return value ? this.plhAssetPipe.transform(value) : _default;
  }

  getDurationFromParams() {
    return this._row.value ? this._row.value : this.starting_minutes * 60 + this.starting_seconds;
  }

  clickLeftButton() {
    this.state.clickLeftButton();
  }

  clickRightButton() {
    this.state.clickRightButton();
  }

  openPicker() {
    if (this.isTimerEditable) {
      const numColumns = 4;
      const columnOptions = this.timeValues();
      this.pickerController
        .create({
          mode: this.platform.is("android") ? "md" : "ios" || "ios",
          columns: this.getColumns(numColumns, columnOptions),
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: (_) => (this.timerStarted ? this.state.clickLeftButton() : null),
            },
            {
              text: "Confirm",
              handler: (value) => {
                const min =
                  Object.values(value["col-0"]).toString().split(",")[0].trim() +
                  Object.values(value["col-1"]).toString().split(",")[0].trim();
                const sec =
                  Object.values(value["col-2"]).toString().split(",")[0].trim() +
                  Object.values(value["col-3"]).toString().split(",")[0].trim();
                this.state.editTimer(min, "mm");
                this.state.editTimer(sec, "ss");
              },
            },
          ],
          cssClass: "picker",
        })
        .then((e) => e.present());
    }
  }

  getColumns(numColumns, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, i % 2 === 0 ? 6 : 10, columnOptions),
        selectedIndex: getIndex(i, this.minutes, this.seconds),
      });
    }

    function getIndex(index: number, minutes: string, seconds: string): number {
      switch (index) {
        case 0:
          return Number(minutes.charAt(0));
        case 1:
          return Number(minutes.charAt(1));
        case 2:
          return Number(seconds.charAt(0));
        case 3:
          return Number(seconds.charAt(1));
        default:
          return 0;
      }
    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i,
      });
    }
    return options;
  }
}

interface TimerState {
  timer: TmplTimerComponent;

  clickLeftButton(): void;

  clickRightButton(): void;

  editTimer(val: string, type: "mm" | "ss"): void;

  callOnInit(): void;
}

abstract class State {
  constructor(public timer: TmplTimerComponent) {}

  clickLeftButton() {}

  clickRightButton() {}

  clickTimer() {}

  editTimer(val: string, type: "mm" | "ss") {
    val = val.replace(/^0/, "");
    let valNumber = Number.parseInt(val);

    if (Number.isNaN(valNumber)) return;

    if (type === "mm") {
      this.timer.minInput.nativeElement.value = val;
      this.timer.value = valNumber * 60 + Number(this.timer.seconds.replace(/^0/, ""));
    } else if (type === "ss") {
      this.timer.secInput.nativeElement.value = val;
      this.timer.value = valNumber + Number(this.timer.minutes.replace(/^0/, "")) * 60;
    }
  }

  callOnInit() {}
}

class PlayingState extends State {
  private intervalRef;

  constructor(timer: TmplTimerComponent) {
    super(timer);
    this.timer.leftButtonAction = "pause";
    this.timer.leftButtonName = "pause_timer";
    this.timer.rightButtonAction = "increase";
    this.timer.rightButtonName = "increase_timer";
    this.timer.timerStarted = true;
    this.timer.isTimerEditable = this.timer.is_editable_on_playing;
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
        if (this.timer.player) this.timer.player.play();
        return;
      }
      this.timer.value -= 1;
    }, 1000);
  }
}

class PausedState extends State {
  constructor(timer: TmplTimerComponent) {
    super(timer);
    this.timer.leftButtonAction = "play";
    this.timer.leftButtonName = "play_timer";
    this.timer.rightButtonAction = "refresh";
    this.timer.rightButtonName = "refresh_timer";
    this.timer.timerStarted = false;
    this.timer.isTimerEditable = true;
  }

  clickLeftButton() {
    this.timer.changeState(new PlayingState(this.timer));
  }

  clickRightButton() {
    this.timer.value = this.timer.getDurationFromParams();
  }
}
