import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'plh-home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrls: ['./home-buttons.component.scss'],
})
export class HomeButtonsComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}
  
  goToPage(url: string) {
    this.router.navigateByUrl(url);
  }

}
