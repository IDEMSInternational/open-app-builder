import { Component, OnInit } from '@angular/core';
import { Song } from './song.model';
import { SongService } from './song.service';
import { AudioRecordingService } from 'src/app/shared/services/audio/audio.recording.service';

@Component({
  selector: 'plh-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {

  songList: Song[];

  constructor(private songService: SongService, private audioRecordingService: AudioRecordingService) {
    songService.getSongList().subscribe((songs) => {
      this.songList = songs;
    });
    this.audioRecordingService.recordAudioTest();
  }

  ngOnInit() {
  }

}
