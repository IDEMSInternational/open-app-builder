import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { fromEvent, merge, Subscription } from "scripts/node_modules/rxjs";
import { ReviewingService } from "src/app/shared/services/reviewing/reviewing.service";
import { FlowTypes } from "../../../shared/model/flowTypes";
import { ContextMenuData } from "./context-menu/context-menu.component";

@Component({
  selector: "plh-reviewing",
  template: `<div class="container">
    <h1>Leave your comment about page</h1>
    <h2>Right click on a specific component to comment about it</h2>
    <div class="formContainer">
      <suggest-form [isComment]="isComment" [isSuggest]="isSuggest" [targetRow]="targetRow">
      </suggest-form>
    </div>
    <existing-comments></existing-comments>
    <context-menu
      *ngIf="isContextMenu"
      [data]="contextMenuData"
      (dismiss)="dismissContextMenu()"
      (open_suggest)="openSuggest()"
      (open_comment)="openComment()"
    ></context-menu>
  </div>`,
  styles: [
    `
      :host {
        flex: 2;
        border-left: var(--ion-border-thin-standard);
        height: 100%;
      }
      h1 {
        margin-bottom: 0;
      }
      h2 {
        font-size: 17px;
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .formContainer {
        flex: 1;
        width: 100%;
      }
    `,
  ],
})
export class ReviewingComponent implements AfterViewInit, OnDestroy {
  public isComment = true;
  public isSuggest = false;
  public isContextMenu = false;
  public isTypeTextRow = false;
  public targetRow: FlowTypes.TemplateRow;
  private subscription$: Subscription;
  public contextMenuData: ContextMenuData;

  private subscribeDocumentEvents$ = merge(
    fromEvent(document, "contextmenu"),
    fromEvent(document, "click")
  );

  constructor(private reviewingService: ReviewingService) {}

  ngAfterViewInit() {
    this.subscription$ = this.subscribeDocumentEvents$.subscribe((e: Event) => {
      if (e.type === "click") {
        this.handleClickEvent(e);
      } else if (e.type === "contextmenu") {
        this.handleContextmenuEvent(e);
      }
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  private handleClickEvent(e: Event) {
    this.dismissContextMenu();
  }

  private handleContextmenuEvent(e: Event) {
    e.preventDefault();
    this.targetRow = this.reviewingService.getTargetRow(e);
    this.isTypeTextRow = this.reviewingService.isText(this.targetRow);
    if (this.targetRow) {
      this.openContextMenu(e);
    }
    console.log(this.targetRow);
  }

  private openContextMenu(e: Event) {
    this.isSuggest = false;
    this.contextMenuData = {
      top: `${e["pageY"]}px`,
      left: `${e["pageX"]}px`,
      isText: this.isTypeTextRow,
      targetRow: this.targetRow,
    };
    this.isContextMenu = true;
  }

  public openSuggest() {
    this.isComment = false;
    this.isSuggest = true;
    this.dismissContextMenu();
  }

  public openComment() {
    this.isSuggest = false;
    this.isComment = true;
    this.dismissContextMenu();
  }

  public dismissContextMenu() {
    if (this.isContextMenu) {
      this.isContextMenu = false;
    }
  }
}
