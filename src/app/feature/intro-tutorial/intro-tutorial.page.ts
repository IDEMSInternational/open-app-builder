import { Component, ViewChild } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { AppTermsPage } from "../app-terms/app-terms.page";
import { PrivacyPage } from "../privacy/privacy.page";

@Component({
  selector: "plh-intro-tutorial",
  templateUrl: "./intro-tutorial.page.html",
  styleUrls: ["./intro-tutorial.page.scss"],
})
export class IntroTutorialPage {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  constructor(private modalCtrl: ModalController, private auth: AuthService) {}

  setPrivacyConsent(analyticsConsent: boolean) {
    localStorage.setItem("analyticsConsent", `${analyticsConsent}`);

    this.slides.slideNext();
  }
  async signIn() {
    this.auth.signIn().subscribe((user) => {
      console.log("user", user);
      this.close();
    });
  }
  close() {
    localStorage.setItem("tutorialComplete", "true");
    this.modalCtrl.dismiss();
  }
  async showTerms() {
    const modal = await this.modalCtrl.create({
      component: AppTermsPage,
      componentProps: { isModal: true },
    });
    await modal.present();
  }
  async showPrivacyPolicy() {
    const modal = await this.modalCtrl.create({
      component: PrivacyPage,
      componentProps: { isModal: true },
    });
    await modal.present();
  }
}
