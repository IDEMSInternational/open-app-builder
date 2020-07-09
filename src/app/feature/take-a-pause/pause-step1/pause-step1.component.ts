import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plh-pause-step1',
  templateUrl: './pause-step1.component.html',
  styleUrls: ['./pause-step1.component.scss'],
})
export class PauseStep1Component implements OnInit {

  @Input()
  audioTime: number = 0;

  constructor() { }

  ngOnInit() {}

}
