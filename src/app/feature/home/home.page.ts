import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'plh-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  homeScreenOption: "indoors-blobs" | "buttons" = "indoors-blobs";

  guideHasNotification: boolean = true;

  constructor(private menuController: MenuController, private router: Router, private route: ActivatedRoute) {}
  
  idClickListeners: { [id: string]: Function } = {};

  ngOnInit(): void {
    this.route.queryParams.subscribe((paramMap) => {
      if (paramMap["homeOption"]) {
        if (paramMap["homeOption"] === "buttons") {
          this.homeScreenOption = "buttons";
        } else {
          this.homeScreenOption = "indoors-blobs";
        }
      }
    });
    Object.keys(this.idClickListeners).forEach((id) => {
      document.getElementById(id).addEventListener("click", () => this.idClickListeners[id]());
    });
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
