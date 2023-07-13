import { Injectable } from "@angular/core";
import { Media, MediaObject } from "@ionic-native/media";

@Injectable({
  providedIn: "root",
})
export class AudioRecordingService {
  constructor() {}

  recordAudioTest() {
    console.log("Testing audio recording");
    // Recording to a file
    const file: MediaObject = Media.create("path/to/file.mp3");

    file.startRecord();

    setTimeout(() => {
      file.stopRecord();
    }, 2000);
  }
}
