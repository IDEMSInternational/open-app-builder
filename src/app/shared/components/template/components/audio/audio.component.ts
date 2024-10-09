import { Component, computed, Input, OnDestroy, OnInit, signal } from "@angular/core";
import { FlowTypes } from "../../../../model";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { Howl } from "howler";
import { ITemplateRowProps } from "../../models";
import { TemplateBaseComponent } from "../base";
import { PLHAssetPipe } from "../../pipes/plh-asset.pipe";
import { ModalController } from "@ionic/angular";
import { TemplatePopupComponent } from "../layout/popup/popup.component";

// Names of ion-icons to be used by default in the player.
// Will be overridden if user provides values for play_icon_asset, pause_icon_asset or forward_icon_asset
const PLAY_ICON_DEFAULT = "play-outline";
const PAUSE_ICON_DEFAULT = "pause-outline";
const FORWARD_ICON_DEFAULT = "play-forward";

interface IAudioParams {
  /** TEMPLATE PARAMETER: "variant". Default "large". */
  variant: "large" | "compact";
  /** TEMPLATE PARAMETER: "src". Will be overridden by a value passed as "value" to the component. */
  src: string;
  /** TEMPLATE PARAMETER: "title" */
  title: string;
  /** TEMPLATE PARAMETER: "play_icon_asset". The path to an svg to override the default play icon. Default icon is ion's "play-outline" */
  playIconAsset: string;
  /** TEMPLATE PARAMETER: "pause_icon_asset". The path to an svg to override the default pause icon. Default icon is ion's "pause-outline" */
  pauseIconAsset: string;
  /**
   * TEMPLATE PARAMETER: "forward_icon_asset". The path to an svg to override the default forward icon.
   * Will be mirrored to be used as the reqind icon. Default icon is ion's "play-forward"
   * */
  forwardIconAsset: string;
  /** TEMPLATE PARAMETER: "show_info_button". Should show the info button. Default false (unless info_icon_asset is provided) */
  showInfoButton: boolean;
  /** TEMPLATE PARAMETER: "info_icon_asset". The path to an svg to override the default info icon. The default is an icon indicating a transcript */
  infoIconAsset: string;
  /**
   * TEMPLATE PARAMETER: "transcript_text". A string representing the transcript of the audio.
   * If provided, the transcript button will be shown and will launch a popup containing the this text
   */
  transcriptText: string;
  /**
   * TEMPLATE PARAMETER: "range_bar_disabled". If true, the use cannot scrub through the audio using the range bar.
   * Default false.
   */
  rangeBarDisabled: boolean;
  /**
   * TEMPLATE PARAMETER: "time_to_skip". The increment of time, in seconds, that will be applied when clicking the forward or backward buttons.
   * Default 15.
   */
  timeToSkip: number;
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

  params: Partial<IAudioParams> = {};

  /** @ignore */
  player: Howl = null;
  /**
   * Track the playing state of the player UI. Decoupled from whether the actual audio is playing (this.player.playing())
   * so that manually seeking works as expected: if player is playing before dragging the slider, playing continues after dragging
   * @ignore
   * */
  isPlaying: boolean = false;
  /**
   * Progress, as a percentage of total duration
   * @ignore
   * */
  progress = signal(0);
  /**
   * Progress in seconds
   * @ignore
   * */
  progressSeconds = computed(() => {
    return (this.progress() / 100) * this.player?.duration();
  });
  /** @ignore */
  hasStarted: boolean = false;
  /** @ignore */
  trackerInterval: NodeJS.Timeout;

  constructor(
    private plhAssetPipe: PLHAssetPipe,
    private modalCtrl: ModalController
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.initPlayer();
  }

  public async handleActionButtonClick() {
    if (this.params.transcriptText) {
      await this.openTranscriptPopup();
    } else {
      await this.triggerActions("info_click");
    }
  }

  private getParams() {
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "compact")
      .split(",")
      .join(" ") as IAudioParams["variant"];
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
    this.params.infoIconAsset = getStringParamFromTemplateRow(this._row, "info_icon_asset", null);
    this.params.transcriptText = getStringParamFromTemplateRow(this._row, "transcript_text", null);
    this.params.showInfoButton =
      !!this.params.infoIconAsset ||
      !!this.params.transcriptText ||
      getBooleanParamFromTemplateRow(this._row, "show_info_button", false);
    this.params.rangeBarDisabled = getBooleanParamFromTemplateRow(
      this._row,
      "range_bar_disabled",
      false
    );
    this.params.timeToSkip = getNumberParamFromTemplateRow(this._row, "time_to_skip", 15);
  }

  private getAssetParamFromTemplateRow(parameterName: string, _default: string | null) {
    const value = getStringParamFromTemplateRow(this._row, parameterName, null);
    return value ? this.plhAssetPipe.transform(value) : _default;
  }

  private initPlayer() {
    if (this.params.src) {
      this.player = new Howl({
        src: [this.params.src],
        onplay: () => {
          this.startProgressTracker();
          if (!this.hasStarted) {
            this.hasStarted = true;
            this.triggerActions("audio_first_start");
          }
          this.triggerActions("audio_play");
        },
        onend: () => {
          this.isPlaying = false;
          this.progress.set(0);
          this.startProgressTracker();
          this.triggerActions("audio_end");
        },
        onpause: () => {
          this.startProgressTracker();
          this.triggerActions("audio_pause");
        },
      });
    } else {
      console.error(
        "[AUDIO COMPONENT] No audio source provided (path to audio asset should be passed as value or 'src' param)"
      );
    }
  }

  public togglePlaying() {
    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  /**
   * Handle dragging of the range bar. Does not seek within the actual audio file,
   * this should only be triggered when the handle is released (on ionChange)
   */
  public onProgressDrag(event) {
    this.progress.set(event.detail.value);
  }

  /**
   * Jump to a specific time in the audio (i.e. "seek")
   * @param targetTime in milliseconds, default is current progress
   */
  public seekToTime(targetTime: number = this.progressSeconds()) {
    // Ensure targetTime does not go below 0
    if (targetTime < 0) {
      targetTime = 0;
    }
    this.player.seek(targetTime);
    this.progress.set((targetTime / this.player.duration()) * 100 || 0);
  }

  public skipForward() {
    this.skip(this.params.timeToSkip);
  }

  public skipBackward() {
    this.skip(-this.params.timeToSkip);
  }

  /**
   * Skip forward or backward by a specified interval
   * @param timeToSkip in seconds
   */
  public skip(timeToSkip: number) {
    const currentTime = this.player.seek();
    const targetTime = currentTime + timeToSkip;
    this.seekToTime(targetTime);
  }

  /**
   * Begins tracking audio playback progress, updating this.progress() with the current playback percentage
   */
  private startProgressTracker() {
    const duration = this.player.duration();
    // Caculate interval (in milliseconds) as 1/200th of the audio duration (in seconds)
    const interval = duration * 5;
    this.stopProgressTracker(); // Ensure any existing tracker is stopped
    this.trackerInterval = setInterval(() => {
      if (!this.player.playing()) {
        this.stopProgressTracker();
        return;
      }
      this.progress.set((this.player.seek() / duration) * 100 || 0);
    }, interval);
  }

  private stopProgressTracker() {
    if (this.trackerInterval) {
      clearInterval(this.trackerInterval);
      this.trackerInterval = null;
    }
  }

  private async openTranscriptPopup() {
    const modal = await this.modalCtrl.create({
      component: TemplatePopupComponent,
      componentProps: {
        props: {
          textOnly: true,
          text: this.params.transcriptText,
          fullscreen: false,
          showCloseButton: true,
        },
      },
      id: "popup-audio-transcript",
      // update to this styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "template-popup-modal",
      showBackdrop: false,
    });
    modal.present();
  }

  async ngOnDestroy() {
    this.player?.stop();
    const activeModal = await this.modalCtrl.getTop();
    if (activeModal) {
      await activeModal.dismiss();
    }
  }
}
