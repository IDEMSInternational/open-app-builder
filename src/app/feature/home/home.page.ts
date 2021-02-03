import { Component, OnInit } from '@angular/core';
import { FlowTypes } from 'scripts/types';
import { HOME_PAGE } from 'src/app/shared/services/data/data.service';

@Component({
  selector: 'plh-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  buttons: FlowTypes.Home_pageRow[] = [];

  constructor() {
    if (HOME_PAGE && HOME_PAGE.length > 0 && HOME_PAGE[0] && HOME_PAGE[0].rows) {
      this.buttons = HOME_PAGE[0].rows
        .filter((row) => row.type === "button")
        .filter((row) => row.visible);
    }
    
  }

  ngOnInit() {
  }

}
