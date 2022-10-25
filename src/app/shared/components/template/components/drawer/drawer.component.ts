import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class TmplDrawerComponent extends TemplateBaseComponent implements AfterViewInit {
  @ViewChild("drawer", { read: ElementRef }) drawer: ElementRef;
  @Output() openStateChanged = new EventEmitter<boolean>();

  isOpen = false;
  openHeight = 0;

  async ngAfterViewInit() {
    // hack to only get element heights after they've rendered
    setTimeout(async () => {
      const drawer = this.drawer.nativeElement;
      const handle = drawer.children[0];
      this.openHeight = drawer.offsetHeight - handle.offsetHeight - 10;
      console.log(this.openHeight);
    }, 100);
  }

  toggleDrawer() {
    const drawer = this.drawer.nativeElement;
    this.openStateChanged.emit(!this.isOpen);

    if (this.isOpen) {
      drawer.style.transition = "transform .3s ease-out";
      drawer.style.transform = "";
      this.isOpen = false;
    } else {
      drawer.style.transition = "transform .3s ease-out";
      drawer.style.transform = `translateY(${-this.openHeight}px)`;
      this.openStateChanged.emit(true);
      this.isOpen = true;
    }
  }

  // WIP: open and close drawer with a swipe
  // Requires `gestureCtrl: GestureController` in constructor
  // async enableGestures() {
  //   const drawer = this.drawer.nativeElement;

  //   const gesture = await this.gestureCtrl.create({
  //     el: drawer,
  //     gestureName: "swipe",
  //     direction: "y",
  //     onMove: (event) => {
  //       console.log("deltaY:", event.deltaY);
  //       if (event.deltaY < -this.openHeight) {
  //         return;
  //       } else drawer.style.transform = `translateY(${event.deltaY}px)`;
  //     },
  //     onEnd: (event) => {
  //       console.log("end", event);
  //       if (event.deltaY < -50 && !this.isOpen) {
  //         drawer.style.transition = "transform .4s ease-out";
  //         drawer.style.transform = `translateY(${-this.openHeight}px)`;
  //         this.openStateChanged.emit(true);
  //         this.isOpen = true;
  //       } else if (event.deltaY > 50 && this.isOpen) {
  //         drawer.style.transition = ".4s ease-out";
  //         drawer.style.transform = "";
  //         this.openStateChanged.emit(false);
  //         this.isOpen = false;
  //       }
  //     },
  //   });
  //   gesture.enable(true);
  // }
}
