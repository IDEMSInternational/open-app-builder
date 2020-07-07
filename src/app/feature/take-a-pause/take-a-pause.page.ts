import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio/audio.service';
import { AudioPlayer } from 'src/app/shared/services/audio/audio.player';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'plh-take-a-pause',
  templateUrl: './take-a-pause.page.html',
  styleUrls: ['./take-a-pause.page.scss'],
})
export class TakeAPausePage implements OnInit {

  currentStep = 0;

  isPlaying = false;

  audioPlayer: AudioPlayer;
  audioTime: number = 0;

  stepTimings = [
    0, // Step 0
    7, // Step 1
    30, // Step 2
    77, // 1:15, Step 3
    111, // 1:49, Step 4
    122, // 2:00, Step 5
  ];
  audioLength = 134; // 2:13

  stepTitles = [
    "Let's take a minute to take a pause",
    "Step 1: Set up",
    "Step 2: Think, feel, body",
    "Step 3: Focus on your breath",
    "Step 4: Coming Back",
    "Step 5: Reflecting"
  ];

  constructor(private audioService: AudioService, private router: Router) { }

  ngOnInit() {
    this.audioPlayer = this.audioService.createPlayer("assets/audio/take-a-pause/take_a_pause_anna3a.mp3");
    this.audioPlayer.setPlaybackRate(1);
    this.audioPlayer.play();
    this.isPlaying = true;
    setInterval(() => {
      this.audioPlayer.getCurrentPosition().then((currentPos) => {
        this.audioTime = currentPos;
        for (var i = this.stepTimings.length; i > 0; i--) {
          if (currentPos > this.stepTimings[i]) {
            this.currentStep = i;
            break;
          }
        }
      });
    }, 300);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.audioPlayer.stop();
        this.isPlaying = false;
      }
      if (event instanceof NavigationEnd && event.url === "/take-a-pause") {
        this.audioPlayer.stop();
        this.audioPlayer.play();
        this.isPlaying = true;
      }
    });
  }

  

  toggleAudio() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.audioPlayer.pause();
    } else {
      this.isPlaying = true;
      this.audioPlayer.play();
    }
  }

}
