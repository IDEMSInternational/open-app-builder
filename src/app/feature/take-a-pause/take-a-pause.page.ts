import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plh-take-a-pause',
  templateUrl: './take-a-pause.page.html',
  styleUrls: ['./take-a-pause.page.scss'],
})
export class TakeAPausePage implements OnInit {

  currentStep = 0;

  constructor() { }

  ngOnInit() {
  }

}
