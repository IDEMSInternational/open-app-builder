import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'plh-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menuController: MenuController) {}

  toggleMenu() {
    this.menuController.toggle('main-side-menu');
  }

}
