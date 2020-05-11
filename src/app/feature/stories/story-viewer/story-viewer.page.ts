import { Component, OnInit } from '@angular/core';
import { Story } from '../story.model';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../story.service';

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

  constructor(private route: ActivatedRoute, private storyService: StoryService) {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        var id = params["id"];
        this.storyService.getStoryList().subscribe((storyList) => {
          this.currentStory = storyList.find((story) => story.id === id);
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
