import { Component, computed, effect, OnDestroy, signal } from "@angular/core";
import { Howl } from "howler";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { ModalController } from "@ionic/angular";
import { TemplatePopupComponent } from "../layout/popup/popup.component";
import { TemplateAssetService } from "../../services/template-asset.service";

// Names of ion-icons to be used by default in the player.
// Will be overridden if user provides values for play_icon_asset, pause_icon_asset or forward_icon_asset
const PLAY_ICON_DEFAULT = "play-outline";
const PAUSE_ICON_DEFAULT = "pause-outline";
const FORWARD_ICON_DEFAULT = "play-forward";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Display variant. Default "compact". */
  variant: coerce.string("compact"),
  /** Audio source path. May be overridden by row value. */
  src: coerce.string(""),
  /** Title displayed above the player. */
  title: coerce.string(""),
  /** Path to svg to override the default play icon. Default ion "play-outline". */
  play_icon_asset: coerce.string(""),
  /** Path to svg to override the default pause icon. Default ion "pause-outline". */
  pause_icon_asset: coerce.string(""),
  /** Path to svg to override the default forward icon (mirrored for rewind). Default ion "play-forward". */
  forward_icon_asset: coerce.string(""),
  /** When true, show the info button. Also true if info_icon_asset or transcript_text are set. */
  show_info_button: coerce.boolean(false),
  /** Path to svg to override the default info icon. */
  info_icon_asset: coerce.string(""),
  /** Transcript text; if set, info button shows and opens a popup with this text. */
  transcript_text: coerce.string(""),
  /** When true, the range bar cannot be used to scrub. Default false. */
  range_bar_disabled: coerce.boolean(false),
  /** Seconds to skip forward/backward when using skip buttons. Default 15. */
  time_to_skip: coerce.number(15),
}));

@Component({
  selector: "plh-audio",
  templateUrl: "./audio.component.html",
  styleUrls: ["./audio.component.scss"],
  standalone: false,
})
export class TmplAudioComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements OnDestroy
{
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
  /** Duration in seconds, set when Howl has loaded the audio file */
  durationSeconds = signal(0);
  /**
   * Progress in seconds
   * @ignore
   * */
  progressSeconds = computed(() => {
    const duration = this.durationSeconds() || 0;
    return (this.progress() / 100) * duration;
  });
  /** @ignore */
  hasStarted: boolean = false;
  /** True when playback has reached the end (so we show duration instead of 00:00). */
  hasEnded = signal(false);
  /** @ignore */
  trackerInterval: NodeJS.Timeout;
  /** Track any opened transcript modal to close on destroy */
  private transcriptModal: HTMLIonModalElement;

  /** Resolved audio src: row value or authored src, translated. */
  resolvedSrc = computed(() => {
    const raw = (this.value() as string) || this.params().src || "";
    if (!raw) return "";
    return this.templateAssetService.getTranslatedAssetSignal(raw)() ?? "";
  });

  resolvedPlayIconAsset = computed(() => {
    const p = this.params().playIconAsset;
    if (!p) return PLAY_ICON_DEFAULT;
    return this.templateAssetService.getTranslatedAssetSignal(p)() ?? PLAY_ICON_DEFAULT;
  });

  resolvedPauseIconAsset = computed(() => {
    const p = this.params().pauseIconAsset;
    if (!p) return PAUSE_ICON_DEFAULT;
    return this.templateAssetService.getTranslatedAssetSignal(p)() ?? PAUSE_ICON_DEFAULT;
  });

  resolvedForwardIconAsset = computed(() => {
    const p = this.params().forwardIconAsset;
    if (!p) return FORWARD_ICON_DEFAULT;
    return this.templateAssetService.getTranslatedAssetSignal(p)() ?? FORWARD_ICON_DEFAULT;
  });

  /** True when info button should be shown (authored flag or info/transcript content). */
  showInfoButton = computed(
    () =>
      !!this.params().infoIconAsset ||
      !!this.params().transcriptText ||
      this.params().showInfoButton
  );

  constructor(
    private templateAssetService: TemplateAssetService,
    private modalCtrl: ModalController
  ) {
    super();
    effect(() => {
      const src = this.resolvedSrc();
      if (src && !this.player) {
        this.initPlayer();
      }
    });
  }

  public async handleActionButtonClick() {
    if (this.params().transcriptText) {
      await this.openTranscriptPopup();
    } else {
      await this.triggerActions("info_click");
    }
  }

  private initPlayer() {
    const src = this.resolvedSrc();
    if (src) {
      this.player = new Howl({
        src: [src],
        onload: () => {
          this.durationSeconds.set(this.player.duration());
        },
        onplay: () => {
          this.hasEnded.set(false);
          this.startProgressTracker();
          if (!this.hasStarted) {
            this.hasStarted = true;
            this.triggerActions("audio_first_start");
          }
          this.triggerActions("audio_play");
        },
        onend: () => {
          this.isPlaying = false;
          this.hasEnded.set(true);
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
    this.skip(this.params().timeToSkip);
  }

  public skipBackward() {
    this.skip(-this.params().timeToSkip);
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
    this.transcriptModal = await this.modalCtrl.create({
      component: TemplatePopupComponent,
      componentProps: {
        props: {
          popupText: this.params().transcriptText,
          fullscreen: false,
          showCloseButton: true,
        },
      },
      id: "popup-audio-transcript",
      // update to this styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "template-popup-modal",
      showBackdrop: false,
    });
    this.transcriptModal.present();
  }

  async ngOnDestroy() {
    this.player?.stop();
    if (this.transcriptModal) {
      await this.transcriptModal.dismiss();
    }
  }
}
