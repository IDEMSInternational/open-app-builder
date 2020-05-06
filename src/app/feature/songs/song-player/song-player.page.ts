import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { SongService } from '../song.service';
import { Song } from '../song.model';

@Component({
  selector: 'plh-song-player',
  templateUrl: './song-player.page.html',
  styleUrls: ['./song-player.page.scss'],
})
export class SongPlayerPage implements OnInit {
  
  currentSong: Song;

  currentMinutes: number = 0;
  currentSeconds: number = 0;

  hasInstructions: boolean = false;
  hasTwoPeople: boolean = false;

  lyricLinesInstructions: string[] = [];
  lyricLinesPerson1: string[] = [];
  lyricLinesPerson2: string[] = [];

  lyricPerson1Color: string = "white";
  lyricPerson2Color: string = "white";

  @ViewChild("audioElem", { static: false }) audioVC: { nativeElement: HTMLAudioElement};

  paused: boolean = false;

  constructor(private route: ActivatedRoute, 
    private songService: SongService, private router: Router) {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        var id = parseInt(params["id"]);
        this.songService.getSongList().subscribe((songList) => {
          this.currentSong = songList[id];
        });
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          this.audioVC.nativeElement.pause();
          this.audioVC.nativeElement.currentTime = 0;
      }
  });
    
  }

  ngOnInit(): void {
    
  }

  toggleAudio() {
    if (this.paused) {
      this.audioVC.nativeElement.play();
      this.paused = false;
    } else {
      this.audioVC.nativeElement.pause();
      this.paused = true;
    }
  }

  pickRandom(list: string[]): string {
    const randomIndex = Math.ceil(Math.random() * list.length - 0.00000001) - 1;
    console.log("Random!", randomIndex, list[randomIndex]);
    return list[randomIndex];
  }

  onAudioTimeUpdate(elem: HTMLAudioElement) {
    this.audioVC.nativeElement.playbackRate = 1;
    var audioCurrentTimeSec = elem.currentTime;
    this.currentMinutes = Math.floor(audioCurrentTimeSec / 60);
    this.currentSeconds = audioCurrentTimeSec - this.currentMinutes * 60;
    for (var lyric of this.currentSong.lyrics) {
      var startTimeSec: number = parseFloat(lyric.startTimeMinute) * 60 + parseFloat(lyric.startTimeSecond);
      var endTimeSec: number = parseFloat(lyric.endTimeMinute) * 60 + parseFloat(lyric.endTimeSecond);
      if (audioCurrentTimeSec >= startTimeSec && audioCurrentTimeSec <= endTimeSec) {
        var newLines = lyric.lyric.split("\n");
        if (lyric.isInstructions && lyric.isInstructions.trim().toLowerCase() === "true") {
          this.hasInstructions = true;
          this.lyricLinesInstructions = newLines;
        } else
        if (lyric.person === "2") {
          this.hasTwoPeople = true;
          if (newLines[0] && newLines[0] !== this.lyricLinesPerson2[0]) {
            this.lyricPerson2Color = this.pickRandom(["lightpink", "pink", "darkred", "black", "white"]);
          }
          this.lyricLinesPerson2 = newLines;
        } else {
          var newLines = lyric.lyric.split("\n");
          if (newLines[0] && newLines[0] !== this.lyricLinesPerson1[0]) {
            this.lyricPerson1Color = this.pickRandom(["skyblue", "cyan", "blue", "lightblue", "teal", "black", "white"]);
          }
          this.lyricLinesPerson1 = newLines;
        }
      }
    }
  }

}
