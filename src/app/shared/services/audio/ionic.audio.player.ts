import { Media, MediaObject } from "@ionic-native/media";
import { Observable } from "rxjs";
import { AudioPlayer } from "./audio.player";

export class IonicNativeAudioPlayer implements AudioPlayer {
  ionicMediaObj: MediaObject;

  constructor(src: string) {
    var prefix = "/android_asset/www/";
    if (window["device"].platform === "iPhone") {
      prefix = "";
    }
    this.ionicMediaObj = Media.create(prefix + src);
    console.log("Ionic media object: ", this.ionicMediaObj);
  }

  play(): void {
    this.ionicMediaObj.play();
  }

  pause(): void {
    this.ionicMediaObj.pause();
  }

  stop(): void {
    this.ionicMediaObj.stop();
  }

  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ionicMediaObj.getCurrentPosition().then((val) => {
        if (val >= 0) {
          resolve(val);
        }
      });
    });
  }

  setPlaybackRate(speed: number) {
    this.ionicMediaObj.setRate(speed);
  }
}
