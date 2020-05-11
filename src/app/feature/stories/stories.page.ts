import { Component, OnInit } from '@angular/core';
import { Story } from './story.model';
import { StoryService } from './story.service';

@Component({
  selector: 'plh-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage {
  
  storyList: Story[];

  constructor(private storyService: StoryService) { 
    storyService.getStoryList().subscribe((stories) => {
      this.storyList = stories;
    });
  }
}
