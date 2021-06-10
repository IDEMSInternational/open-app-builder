import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
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
  private contextMenuOpened = false;
  public targetRow: FlowTypes.TemplateRow;
  private subscription$: Subscription;

  private subscribeDocumentEvents$ = merge(
    fromEvent(document, "contextmenu"),
    fromEvent(document, "click")
  );

  public reviewingForm = new FormGroup({
    comment: new FormControl(""),
    anyField: new FormControl(""),
    anyField2: new FormControl(""),
  });

  constructor(private router: Router) {}

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
    this.openContextMenu(e["pageX"], e["pageY"]);
  }

  private openContextMenu(x: number, y: number) {
    this.closeForm();
    this.contextMenuOpened = true;
    this.contextMenu.nativeElement.style.top = `${y}px`;
    this.contextMenu.nativeElement.style.left = `${x}px`;
    this.contextMenu.nativeElement.style.visibility = "visible";
  }

  public openForm() {
    if (this.isComment) {
      this.isComment = false;
    }
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
    this.isComment = false;
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
