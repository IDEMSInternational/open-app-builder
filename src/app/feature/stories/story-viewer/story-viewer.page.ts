import { Component, OnInit } from '@angular/core';
import { Story } from '../story.model';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../story.service';
import { AudioService } from 'src/app/shared/services/audio/audio.service';

@Component({
  selector: 'plh-story-viewer',
  templateUrl: './story-viewer.page.html',
  styleUrls: ['./story-viewer.page.scss'],
})
export class StoryViewerPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  currentStory: Story;
  currentSlideIndex: number = 0;

  constructor(private route: ActivatedRoute, private storyService: StoryService,
    private audioService: AudioService) {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        var id = params["id"];
        this.storyService.getStoryList().subscribe((storyList) => {
          this.currentStory = storyList.find((story) => story.id === id);
          if (this.currentStory.narrationAudioSrc) {
            var audioPlayer = this.audioService.createPlayer(this.currentStory.narrationAudioSrc);
            audioPlayer.play();
            setInterval(() => {
              audioPlayer.getCurrentPosition().then((pos) => console.log("Current pos?", pos));
            }, 1000);
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
