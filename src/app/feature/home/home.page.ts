import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'plh-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menuController: MenuController, private router: Router) {}

  toggleMenu() {
    this.menuController.toggle('main-side-menu');
  }

  goToPage(url: string) {
    this.router.navigateByUrl(url);
  }

}
