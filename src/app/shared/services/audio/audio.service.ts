import { Injectable } from "@angular/core";
import { AudioPlayer, HTML5AudioPlayer } from "./audio.player";
import { IonicNativeAudioPlayer } from "./ionic.audio.player";
import { Capacitor } from "@capacitor/core";

@Injectable({
  providedIn: "root",
})
export class AudioService {
  constructor() {}

  createPlayer(src: string): AudioPlayer {
    if (Capacitor.isNative) {
      return new IonicNativeAudioPlayer(src);
    } else {
      return new HTML5AudioPlayer(src);
    }
  }
}
