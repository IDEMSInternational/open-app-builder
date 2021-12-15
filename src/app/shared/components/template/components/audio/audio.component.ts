import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FlowTypes } from "../../../../model";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { Howl } from "howler";
import { IonRange } from "@ionic/angular";
import { ITemplateRowProps } from "../../models";
import { TemplateBaseComponent } from "../base";
import { TemplateAssetService } from "../../services/template-asset.service";

@Component({
  selector: "plh-audio",
  templateUrl: "./audio.component.html",
  styleUrls: ["./audio.component.scss"],
})
export class TmplAudioComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit, OnDestroy
{
  @Input() template: FlowTypes.Template;
  @ViewChild("range", { static: false }) range: IonRange;
  src: string | null;
  titleAudio: string | null;
  help: string | null;
  isMute: boolean = false;
  player: Howl = null;
  isPlayed: boolean = false;
  errorTxt: string | null;
  progress = 0;
  timeToRewind: number = 15;
  rangeBarTouched: boolean = false;
  currentTimeSong: string = "0";
  rangeBarDisabled: boolean = false;
  hasStarted: boolean = false;

  constructor(private templateAssetService: TemplateAssetService) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.initPlayer();
  }

  getParams() {
    this.src = this.templateAssetService.getTranslatedAssetPath(
      this._row.value || getStringParamFromTemplateRow(this._row, "src", null)
    );
    this.titleAudio = getStringParamFromTemplateRow(this._row, "title", "Title");
    this.help = getStringParamFromTemplateRow(this._row, "help", null);
    this.rangeBarDisabled = getBooleanParamFromTemplateRow(this._row, "range_bar_disabled", false);
    this.timeToRewind = getNumberParamFromTemplateRow(this._row, "time_to_rewind", 15);
  }

  initPlayer() {
    return this.src
      ? (this.player = new Howl({
          src: [this.src],
          onplay: () => {
            this.isPlayed = true;
            this.updateProgress();
            if (!this.hasStarted) {
              this.hasStarted = true;
              this.triggerActions("audio_first_start");
            }
            this.triggerActions("audio_play");
          },
          onend: () => {
            this.isPlayed = false;
            this.range.value = 0;
            this.currentTimeSong = "0";
            this.updateProgress();
            this.triggerActions("audio_end");
          },
          onpause: () => {
            this.isPlayed = false;
            this.updateProgress();
            this.triggerActions("audio_pause");
          },
        }))
      : (this.errorTxt = "Src is undefined, player not initialized");
  }

  togglePlayer() {
    this.isPlayed = !this.isPlayed;
    return this.isPlayed ? this.player.play() : this.player.pause();
  }

  rewindNext() {
    this.player.seek((this.player.seek() as any) + this.timeToRewind);
    this.customUpdateWhenRewind();
  }

  rewindPrev() {
    this.player.seek(
      (this.player.seek() as any) < this.timeToRewind
        ? (this.player.seek(0) as any)
        : (this.player.seek() as any) - this.timeToRewind
    );
    this.customUpdateWhenRewind();
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
    this.rangeBarTouched = false;
    this.updateProgress();
  }

  toggleMute() {
    this.isMute = !this.isMute;
    this.player.mute(this.isMute);
  }

  updateProgress() {
    const ref = setInterval(() => {
      if (!this.isPlayed || this.rangeBarTouched) {
        clearInterval(ref);
        return;
      }
      let seek: any = this.player.seek();
      this.progress = (seek / this.player.duration()) * 100 || 0;
      this.currentTimeSong = this.player.seek() ? (this.player.seek() as any).toString() : "0";
    }, 1000);
  }

  checkFocus() {
    this.rangeBarTouched = true;
  }

  checkChange() {
    if (this.rangeBarTouched) {
      let newValue = +this.range.value;
      let duration = this.player.duration();
      this.player.seek(duration * (newValue / 100));
      this.currentTimeSong = this.player.seek() ? (this.player.seek() as any).toString() : "0";
    }
  }

  customUpdateWhenRewind() {
    if (!this.isPlayed) {
      let seek: any = this.player.seek();
      this.progress = (seek / this.player.duration()) * 100 || 0;
      this.currentTimeSong = this.player.seek() ? (this.player.seek() as any).toString() : "0";
    }
  }

  ngOnDestroy() {
    this.player.stop();
  }
}
