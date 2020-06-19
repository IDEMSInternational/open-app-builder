import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plh-reflect-animation',
  templateUrl: './reflect-animation.component.html',
  styleUrls: ['./reflect-animation.component.scss'],
})
export class ReflectAnimationComponent implements OnInit {

  @Input()
  progress: number = 0;

  constructor() { }

  ngOnInit() {}

}
