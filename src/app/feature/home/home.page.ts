import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'plh-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  homeScreenOption: "indoors-blobs" | "buttons" | "empty" = "empty";

  guideHasNotification: boolean = true;

  constructor(private menuController: MenuController, private router: Router, private route: ActivatedRoute,
    private localStorageService: LocalStorageService) { }

  idClickListeners: { [id: string]: Function } = {};

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (localStorage.getItem("home_screen.use_button_version") === "true") {
        this.homeScreenOption = "buttons";
      }
    });
    this.route.queryParams.subscribe((paramMap) => {
      if (this.shouldRedirectToWelcome()) {
        this.homeScreenOption = "empty";
      } else {
        this.homeScreenOption = "indoors-blobs";
        if (paramMap["homeOption"]) {
          if (paramMap["homeOption"] === "buttons") {
            this.homeScreenOption = "buttons";
          } else {
            this.homeScreenOption = "indoors-blobs";
          }
        }
      }
    });

    Object.keys(this.idClickListeners).forEach((id) => {
      document.getElementById(id).addEventListener("click", () => this.idClickListeners[id]());
    });
  }

  ionViewWillEnter() {
    if (this.shouldRedirectToWelcome()) {
      this.homeScreenOption = "empty";
      this.router.navigateByUrl("/chat?trigger=welcome");
    }
  }

  shouldRedirectToWelcome() {
    return !(this.localStorageService.getBoolean("welcome_finished") || this.localStorageService.getBoolean("welcome_skipped"));
  }

  toggleMenu() {
    this.menuController.toggle('main-side-menu');
  }

  goToPage(url: string) {
    this.router.navigateByUrl(url);
  }

  openChat() {
    this.router.navigateByUrl("/chat?character=egg")
  }

  openGuide() {
    this.router.navigateByUrl("/chat?character=guide")
  }

}
