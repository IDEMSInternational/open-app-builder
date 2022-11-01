import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class TmplDrawerComponent extends TemplateBaseComponent implements OnInit, AfterViewInit {
  @ViewChild("drawer", { read: ElementRef }) drawer: ElementRef;

  isOpen = false;
  openHeight = 0;
  style: string;

  ngOnInit() {
    this.getParams();
  }

  async ngAfterViewInit() {
    // Allow elements to render before initialising
    setTimeout(() => {
      this.init();
    }, 500);
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }

  toggleDrawer() {
    const drawer = this.drawer.nativeElement;

    if (this.isOpen) {
      drawer.style.transition = "transform .3s ease-out";
      drawer.style.transform = "";
      this.isOpen = false;
    } else {
      drawer.style.transition = "transform .3s ease-out";
      drawer.style.transform = `translateY(${-this.openHeight}px)`;
      this.isOpen = true;
    }
  }

  init() {
    const drawer = this.drawer.nativeElement;
    const handle = drawer.children[0];
    this.openHeight = drawer.offsetHeight - handle.offsetHeight - 10;
  }
}
