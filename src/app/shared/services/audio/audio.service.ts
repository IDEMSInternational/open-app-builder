import { Injectable } from '@angular/core';
import { AudioPlayer, IonicNativeAudioPlayer, HTML5AudioPlayer } from './audio.player';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  createPlayer(src: string): AudioPlayer {
    if (window.hasOwnProperty("cordova")) {
      return new IonicNativeAudioPlayer(src);
    } else {
      return new HTML5AudioPlayer(src);
    }
  }
}
