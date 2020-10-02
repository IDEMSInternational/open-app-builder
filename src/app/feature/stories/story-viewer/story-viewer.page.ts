import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Story, StoryOption } from '../story.model';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { StoryService } from '../story.service';
import { AudioService } from 'src/app/shared/services/audio/audio.service';
import { IonSlides } from '@ionic/angular';
import { AudioPlayer } from 'src/app/shared/services/audio/audio.player';
import Swiper, { SwiperOptions } from 'swiper';

@Component({
  selector: 'plh-story-viewer',
  templateUrl: './story-viewer.page.html',
  styleUrls: ['./story-viewer.page.scss'],
})
export class StoryViewerPage implements OnInit, AfterViewInit {

  slideOpts: SwiperOptions = {
    initialSlide: 0,
    speed: 400
  };

  currentStory: Story;
  currentSlideIndex: number = 0;
  panelIdToIndex: { [id: string]: number } = {};

  @ViewChild(IonSlides) slides: IonSlides;
  audioPlayer: AudioPlayer;
  audioInterval: any;
  paused: boolean = true;

  reflectionProgress = 0;
  reflectionInterval: any;
  reflectionStartTime: number;
  showReflection: boolean = false;
  reflectionDurationSeconds = 10;

  constructor(private route: ActivatedRoute, private storyService: StoryService,
    private audioService: AudioService, private router: Router) {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.currentSlideIndex = 0;
        var id = params["id"];
        this.storyService.getStoryList().subscribe((storyList) => {
          this.currentStory = storyList.find((story) => story.id === id);

          // Store the index for panels with id's so we can find it fast later
          this.currentStory.panels.forEach((panel, index) => {
            if (panel.id) {
              this.panelIdToIndex[panel.id] = index;
            }
          });

          // Play narration and autoplay slides (if narration available)
          if (this.currentStory.narrationAudioSrc && !this.currentStory.hasChoices) {
            this.slideOpts.allowTouchMove = false;
            this.audioPlayer = this.audioService.createPlayer(this.currentStory.narrationAudioSrc);
            this.audioPlayer.play();
            this.paused = false;
            this.audioInterval = setInterval(() => {
              this.audioPlayer.getCurrentPosition().then((audioPosSec) => {
                if (this.currentSlideIndex + 1 < this.currentStory.panels.length) {
                  let currentPanel = this.currentStory.panels[this.currentSlideIndex];
                  let nextPanel = this.currentStory.panels[this.currentSlideIndex + 1];
                  // If story has audio but no panel start time then 3.5 seconds per panel default
                  if (!nextPanel.audioStartTimeSeconds) {
                    nextPanel.audioStartTimeSeconds = 3.5 * this.currentSlideIndex;
                  }
                  if (audioPosSec > nextPanel.audioStartTimeSeconds) {
                    this.goToSlide(this.currentSlideIndex + 1);
                  }
                }
              });
            }, 500);
          }
        });
      }

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.audioPlayer) {
            this.audioPlayer.stop();
            this.paused = true;
            delete this.audioPlayer;
          }
          clearInterval(this.audioInterval);
        }
      });
    });

  }
  ngAfterViewInit(): void {
    if (this.slides) {
      this.slides.getSwiper().then((swiper: Swiper) => {
        swiper.on("slideChangeTransitionEnd", () => {
          this.currentSlideIndex = swiper.activeIndex;
        });
      });
    }
  }

  toggleAudio() {
    if (this.paused) {
      this.audioPlayer.play();
      this.paused = false;
    } else {
      this.audioPlayer.pause();
      this.paused = true;
    }
  }

  ngOnInit(): void {
  }

  goToSlide(index: number, speed?: number) {
    this.slides.slideTo(index, speed);
    this.currentSlideIndex = index;
    const currentPanel = this.currentStory.panels[this.currentSlideIndex];
    this.showReflection = false;
  }

  storyOptionClicked(option: StoryOption): void {
    if (option.type === "random") {
      const currentPanel = this.currentStory.panels[this.currentSlideIndex];
      const nextOptions = currentPanel.nextPanelOptions;
      const randomOption = nextOptions[Math.floor(Math.random() * nextOptions.length)];
      console.log("Random option", randomOption);
      this.goToPanelId(randomOption.nextPanelId);
    } else {
      console.log("You picked ", option);
      this.goToPanelId(option.nextPanelId);
    }
  }

  goToPanelId(id: string) {
    if (this.panelIdToIndex[id]) {
      const nextSlideIndex = this.panelIdToIndex[id];
      this.goToSlide(nextSlideIndex);
    } else {
      console.log("No story panel with id ", id);
    }
  }

  tryAgainClicked(): void {
    this.showReflection = false;
    setTimeout(() => {
      this.goToSlide(0);
    });
  }

  endOfStoryNext(): void {
    this.showReflection = true;
    this.reflectionProgress = 0;
    this.reflectionStartTime = new Date().getTime();
    clearInterval(this.reflectionInterval);
    this.reflectionInterval = setInterval(() => {
      let timePassed = new Date().getTime() - this.reflectionStartTime;
      this.reflectionProgress = timePassed / (this.reflectionDurationSeconds * 1000);
      if (this.reflectionProgress > 1) {
        clearInterval(this.reflectionInterval);
      }
    }, 200);
  }

}
