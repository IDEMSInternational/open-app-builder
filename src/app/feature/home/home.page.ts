import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";

@Component({
  selector: "plh-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  homeScreenOption: "indoors-blobs" | "buttons" | "empty" = "empty";

  guideHasNotification: boolean = true;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
    if (this.localStorageService.getBoolean("home_screen.use_button_version")) {
      this.homeScreenOption = "buttons";
    } else {
      this.homeScreenOption = "indoors-blobs";
    }
  }

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
