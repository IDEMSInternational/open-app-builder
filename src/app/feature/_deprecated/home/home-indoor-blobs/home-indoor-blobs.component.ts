import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'plh-home-indoor-blobs',
  templateUrl: './home-indoor-blobs.component.html',
  styleUrls: ['./home-indoor-blobs.component.scss'],
})
export class HomeIndoorBlobsComponent implements OnInit {

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
