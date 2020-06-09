import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plh-pause-step2',
  templateUrl: './pause-step2.component.html',
  styleUrls: ['./pause-step2.component.scss'],
})
export class PauseStep2Component implements OnInit {

  @Input()
  audioTime: number = 0;

  constructor() { }

  ngOnInit() {}

}
