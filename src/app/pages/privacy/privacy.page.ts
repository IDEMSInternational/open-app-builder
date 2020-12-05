import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "plh-privacy",
  templateUrl: "./privacy.page.html",
  styleUrls: ["./privacy.page.scss"],
})
export class PrivacyPage implements OnInit {
  isModal = false;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}
}
