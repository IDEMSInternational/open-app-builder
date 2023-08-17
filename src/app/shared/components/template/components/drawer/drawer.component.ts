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
      drawer.style.transform = `translateY(${-this.getOpenHeight()}px)`;
      this.isOpen = true;
    }
  }

  private getOpenHeight() {
    const drawer = this.drawer.nativeElement;
    const handle = drawer.children[0];
    return drawer.offsetHeight - handle.offsetHeight - 10;
  }
}
