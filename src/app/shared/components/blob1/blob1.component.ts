import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plh-blob1',
  templateUrl: './blob1.component.html',
  styleUrls: ['./blob1.component.scss'],
})
export class Blob1Component implements OnInit {

  @Input()
  bodyColor = "#00A1CD";

  constructor() { }

  ngOnInit() {
  }

}
