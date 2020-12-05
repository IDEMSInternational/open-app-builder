import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "plh-app-terms",
  templateUrl: "./app-terms.page.html",
  styleUrls: ["./app-terms.page.scss"],
})
export class AppTermsPage implements OnInit {
  isModal = false;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}
}
