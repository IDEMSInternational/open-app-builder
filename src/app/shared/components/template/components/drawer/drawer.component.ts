import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class TmplDrawerComponent extends TemplateBaseComponent implements OnInit {
  @ViewChild("drawer") drawer: ElementRef;

  isOpen = false;
  style: string;

  ngOnInit() {
    this.getParams();
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
      // default position is set using translateY (see css), so reducing the pixel value opens the drawer
      drawer.style.transform = `translateY(10px)`;
      this.isOpen = true;
    }
  }
}
