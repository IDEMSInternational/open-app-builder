import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { fromEvent, merge, Subscription } from "rxjs";
import { FlowTypes } from "../../shared/model/flowTypes";

@Component({
  selector: "reviewing-form",
  templateUrl: "reviewing-form.component.html",
  styleUrls: ["reviewing-form.component.scss"],
})
export class ReviewingFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("contextMenu") contextMenu: ElementRef;

  public isComment = true;
  public isForm = false;
  public isTextTypeRow = false;
  private contextMenuOpened = false;
  public targetRow: FlowTypes.TemplateRow;
  private subscription$: Subscription;

  public reviewingForm = {
    comment: "",
    currentValue: "",
    suggestChange: "",
  };

  private subscribeDocumentEvents$ = merge(
    fromEvent(document, "contextmenu"),
    fromEvent(document, "click")
  );

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {}

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
    this.targetRow = this.getTargetRow(e);
    this.isTextTypeRow = this.isTextType(this.targetRow);
    if (this.targetRow) {
      this.openContextMenu(e);
    }
    console.log(this.targetRow);
  }

  private isTextType(row: FlowTypes.TemplateRow): boolean {
    if (row && row.type) {
      if (row.type === "title" || row.type === "subtitle" || row.type === "text") {
        return true;
      } else {
        return false;
      }
    }
  }

  private openContextMenu(e: Event) {
    this.closeForm();
    this.contextMenuOpened = true;
    this.contextMenu.nativeElement.style.top = `${e["pageY"]}px`;
    this.contextMenu.nativeElement.style.left = `${e["pageX"]}px`;
    this.contextMenu.nativeElement.style.visibility = "visible";
  }

  public openForm() {
    if (this.isComment) {
      this.isComment = false;
    }
    this.reviewingForm.currentValue = this.targetRow.value;
    this.isForm = true;
    this.dismissContextMenu();
  }

  public openComment() {
    if (this.isForm) {
      this.isForm = false;
    }
    this.isComment = true;
    this.dismissContextMenu();
  }

  private closeForm() {
    this.isForm = false;
  }

  public submit() {
    this.closeForm();
    console.log(this.reviewingForm);
  }

  private getTargetRow(e: Event): FlowTypes.TemplateRow | null {
    let result = null;
    if (e["path"]) {
      result = e["path"].find((c) => c.localName === "plh-template-component")?.__ngContext__[21];
      return result;
    } else {
      return result;
    }
  }

  public dismissContextMenu() {
    if (this.contextMenuOpened) {
      this.contextMenuOpened = false;
      this.contextMenu.nativeElement.style.visibility = "hidden";
    }
  }
}
