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
import { PLHAssetPipe } from "../../pipes/plh-asset.pipe";

// Names of ion-icons to be used by default in the player.
// Will be overridden if user provides values for play_icon_asset, pause_icon_asset or forward_icon_asset
const PLAY_ICON_DEFAULT = "play-outline";
const PAUSE_ICON_DEFAULT = "pause-outline";
const FORWARD_ICON_DEFAULT = "play-forward";

interface IAudioParams {
  /** TEMPLATE PARAMETER: "src". Will be overridden by a value passed as "value" to the component. */
  src: string;
  /** TEMPLATE PARAMETER: "title" */
  title: string;
  /** TEMPLATE PARAMETER: "play_icon_asset". The path to an svg to override the default play icon. Default icon is ion's "play-outline" */
  playIconAsset: string;
  /** TEMPLATE PARAMETER: "pause_icon_asset". The path to an svg to override the default pause icon. Default icon is ion's "pause-outline" */
  pauseIconAsset: string;
  /** TEMPLATE PARAMETER: "forward_icon_asset". The path to an svg to override the default forward icon.
   * Will be mirrored to be used as the reqind icon. Default icon is ion's "play-forward"
   * */
  forwardIconAsset: string;
  /** TEMPLATE PARAMETER: "help_icon_asset". The path to an svg to override the default help icon. */
  helpIconAsset: string;
  /** TEMPLATE PARAMETER: "help_text". Text to be displayed as a tooltip when clicking the "help" icon.
   * Icon and tooltip will not be displayed if value not provided. Default null */
  helpText: string;
  /** TEMPLATE PARAMETER: "range_bar_disabled". If true, the use cannot scrub through the audio using the range bar.
   * Default false.
   */
  rangeBarDisabled: boolean;
  /** TEMPLATE PARAMETER: "time_to_rewind". The increment of time, in seconds, that will be applied when clicking the forward or backward buttons.
   * Default 15.
   */
  timeToRewind: number;
}

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

  params: Partial<IAudioParams> = {};

  /** @ignore */
  player: Howl = null;
  /** @ignore */
  isPlayed: boolean = false;
  /** @ignore */
  errorTxt: string | null;
  /** @ignore */
  progress = 0;
  /** @ignore */
  rangeBarTouched: boolean = false;
  /** @ignore */
  currentTimeSong: string = "0";
  /** @ignore */
  hasStarted: boolean = false;

  constructor(private plhAssetPipe: PLHAssetPipe) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.initPlayer();
  }

  getParams() {
    this.params.src = this.plhAssetPipe.transform(
      this._row.value || getStringParamFromTemplateRow(this._row, "src", null)
    );
    this.params.playIconAsset = this.getAssetParamFromTemplateRow(
      "play_icon_asset",
      PLAY_ICON_DEFAULT
    );
    this.params.pauseIconAsset = this.getAssetParamFromTemplateRow(
      "pause_icon_asset",
      PAUSE_ICON_DEFAULT
    );
    this.params.forwardIconAsset = this.getAssetParamFromTemplateRow(
      "forward_icon_asset",
      FORWARD_ICON_DEFAULT
    );
    this.params.title = getStringParamFromTemplateRow(this._row, "title", "");
    this.params.helpText = getStringParamFromTemplateRow(this._row, "help_text", null);
    this.params.helpIconAsset = getStringParamFromTemplateRow(this._row, "help_icon_asset", null);
    this.params.rangeBarDisabled = getBooleanParamFromTemplateRow(
      this._row,
      "range_bar_disabled",
      false
    );
    this.params.timeToRewind = getNumberParamFromTemplateRow(this._row, "time_to_rewind", 15);
  }

  getAssetParamFromTemplateRow(parameterName: string, _default: string | null) {
    const value = getStringParamFromTemplateRow(this._row, parameterName, null);
    return value ? this.plhAssetPipe.transform(value) : _default;
  }

  initPlayer() {
    return this.params.src
      ? (this.player = new Howl({
          src: [this.params.src],
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
    this.player.seek((this.player.seek() as any) + this.params.timeToRewind);
    this.customUpdateWhenRewind();
  }

  rewindPrev() {
    this.player.seek(
      (this.player.seek() as any) < this.params.timeToRewind
        ? (this.player.seek(0) as any)
        : (this.player.seek() as any) - this.params.timeToRewind
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
