import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class TmplDrawerComponent extends TemplateBaseComponent implements AfterViewInit {
  @ViewChild("drawer", { read: ElementRef }) drawer: ElementRef;

  isOpen = false;
  openHeight = 0;

  async ngAfterViewInit() {
    // Only get element heights after they've rendered
    setTimeout(async () => {
      const drawer = this.drawer.nativeElement;
      const handle = drawer.children[0];
      this.openHeight = drawer.offsetHeight - handle.offsetHeight - 10;
    }, 100);
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
}
