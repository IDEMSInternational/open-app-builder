import { Component, ElementRef, Input, OnInit, Output, ViewChild } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { FlowTypes } from "data-models";

export interface ContextMenuData {
  top: string;
  left: string;
  isText: boolean;
  targetRow: FlowTypes.TemplateRow;
}

@Component({
  selector: "context-menu",
  templateUrl: "./context-menu.component.html",
  styles: [
    `
      .contextMenu {
        position: fixed;
        height: 100px;
        width: 250px;
        background: var(--ion-color-primary-contrast);
        height: fit-content;
        padding: var(--regular-padding);
        font-size: 13px;
        box-shadow: var(--ion-default-box-shadow);
        z-index: 10;
      }
      .dismiss {
        position: absolute;
        top: -9px;
        right: -5px;
        font-size: 20px;
        cursor: pointer;
      }
      .info {
        margin-bottom: 10px;
      }
    `,
  ],
})
export class ContextMenuComponent implements OnInit {
  @ViewChild("contextMenu") contextMenu: ElementRef;

  @Input() data: ContextMenuData;

  @Output() open_comment = new EventEmitter();
  @Output() open_suggest = new EventEmitter();
  @Output() dissmis = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  openComment() {
    this.open_comment.emit();
  }

  openSuggest() {
    this.open_suggest.emit();
  }

  dismissContextMenu() {
    this.dissmis.emit();
  }
}
