import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "module-list-flow-main-image",
  template: `<div class="image-spacer">
    <img [src]="row.media_asset">
  </div>`,
  styles: [
    `img {
      height: 140px;
      position: absolute;
      right: 20px;
      margin: 20px;
      display: block;
    }
    
    .image-spacer {
      display: block;
      width: 100vw;
      height: 120px;
      background: #F0F9FF;
    }

    @media only screen and (max-width: 360px) {
      img {
        height: 100px;
        right: 10px;
        margin: 10px;
      }
    }
    `
  ],
  styleUrls: ["./flow-components-common.scss"]
})
export class MainImageFlowComponent implements OnInit {

  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;

  constructor() {}

  ngOnInit() {}
}
