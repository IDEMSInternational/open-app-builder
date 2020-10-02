import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'plh-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  guideHasNotification: boolean = true;

  constructor(private menuController: MenuController, private router: Router) {}
  
  idClickListeners: { [id: string]: Function } = {};

  ngOnInit(): void {
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
