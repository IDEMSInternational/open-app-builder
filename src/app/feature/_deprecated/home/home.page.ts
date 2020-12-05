import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";

@Component({
  selector: "plh-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  homeScreenOption: "indoors-blobs" | "buttons" | "empty" = "buttons";

  guideHasNotification: boolean = true;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (!this.localStorageService.getBoolean(LocalStorageService.OPENED_APP_BEFORE)) {
      this.localStorageService.setBoolean(LocalStorageService.OPENED_APP_BEFORE, true);
      this.router.navigateByUrl("/chat/flow/first_app_opening");
    }
  }

  ionViewWillEnter() {}

  toggleMenu() {
    this.menuController.toggle("main-side-menu");
  }

  goToPage(url: string) {
    this.router.navigateByUrl(url);
  }

  openChat() {
    this.router.navigateByUrl("/chat?character=egg");
  }

  openGuide() {
    this.router.navigateByUrl("/chat?character=guide");
  }
}
