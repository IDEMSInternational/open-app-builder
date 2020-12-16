import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";

@Component({
  selector: "module-list-flow-main-image",
  template: `<div class="image-spacer">
    <img [src]="row.media_asset" />
  </div>`,
  styles: [
    `
      img {
        height: 140px;
        margin: auto;
        display: block;
        position: relative;
        bottom: -25px;
      }

      .image-spacer {
        text-align: center;
        background: var(--ion-color-primary-lighter);
        margin-top: -25px;
      }

      @media only screen and (max-width: 360px) {
        img {
          height: 100px;
        }
      }
    `,
  ],
  styleUrls: ["./flow-components-common.scss"],
})
export class MainImageFlowComponent implements OnInit {
  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;

  constructor() {}

  ngOnInit() {}
}
