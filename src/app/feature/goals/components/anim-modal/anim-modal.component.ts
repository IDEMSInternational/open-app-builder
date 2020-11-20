import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { REWARD_ANIMATIONS } from './anim.model';

@Component({
  selector: 'plh-anim-modal',
  templateUrl: './anim-modal.component.html',
  styleUrls: ['./anim-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnimModalComponent {

  @Input()
  id: string;

  @Input()
  loop?: boolean;

  @Input()
  title?: string;

  @Input()
  autoCloseMs = 3000;

  lottieOptions: AnimationOptions & { path: string };

  autocloseTimeoutRef: any;

  constructor(private modalController: ModalController) { }

  ionViewWillEnter() {
    let matchingAnim = REWARD_ANIMATIONS.find((animSummary) => animSummary.id === this.id);
    if (matchingAnim && matchingAnim.lottieAssetPath) {
      this.lottieOptions = {
        path: matchingAnim.lottieAssetPath,
        loop: this.loop !== undefined ? this.loop : matchingAnim.loop
      };
    } else {
      this.lottieOptions = null;
    }
    if (this.autoCloseMs > 0) {
      this.autocloseTimeoutRef = setTimeout(() => {
        this.modalController.dismiss();
      }, this.autoCloseMs);
    }
  }

  dismiss() {
    clearTimeout(this.autocloseTimeoutRef);
    this.modalController.dismiss();
    
  }

}
