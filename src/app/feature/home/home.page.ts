import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { SettingsService } from '../settings/settings.service';

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
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
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
