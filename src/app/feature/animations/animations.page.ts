import { Component, OnInit } from '@angular/core';
import { AnimationMetadata, ANIMATION_METADATA_BY_ID } from 'src/app/shared/components/animations';

@Component({
  selector: 'plh-animations',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Animation Browser</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-input class="input" placeholder="Search for animations" (ionChange)="searchInputChanged($event.target.value)"></ion-input>
      <section class="animation-cards">
        <ion-card class="animation-card" *ngFor="let anim of animations">
          <h2>{{anim.name}}</h2>
          <span class="id-text">{{anim.id}}</span>
          <p>{{anim.description}}</p>
          <plh-css-animation [animationId]="anim.id"></plh-css-animation>
        </ion-card>
      </section>
    </ion-content>
  `,
  styleUrls: ['./animations.page.scss'],
})
export class AnimationsPage implements OnInit {

  animations: AnimationMetadata[] = Object.values(ANIMATION_METADATA_BY_ID);

  constructor() { }

  ngOnInit() {
  }

  searchInputChanged(term: string) {
    this.animations = Object.values(ANIMATION_METADATA_BY_ID)
      .filter((anim) => {
        const asString = anim.id + " " + anim.name + " " + anim.description;
        return asString.toLowerCase().indexOf(term.toLowerCase()) > -1;
      }); 
  }

}
