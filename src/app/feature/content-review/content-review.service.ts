import { Injectable, NgZone } from "@angular/core";

import {
  ActionSheetController,
  Gesture,
  GestureController,
  GestureDetail,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { SuggestFormComponent } from "./components/suggest-form/suggest-form.component";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { FlowTypes } from "data-models";
import { Device } from "@capacitor/device";

@Injectable({
  providedIn: "root",
})
export class ContentReviewService {
  public isReviewingMode$ = new BehaviorSubject(false);
  private longPressActive = false;
  private targetRow: FlowTypes.TemplateRow;
  private isTextType: boolean;
  private actionSheet: HTMLIonActionSheetElement;
  private guesture: Gesture;

  public currentPlatform: string;

  constructor(
    public actionSheetController: ActionSheetController,
    private gestureCtrl: GestureController,
    private zone: NgZone,
    private modal: ModalController,
    public toastController: ToastController,
    private router: Router
  ) {}
  public init() {
    Device.getInfo().then((v) => {
      this.currentPlatform = v.platform;
    });
    this.useLongPress();
    this.isReviewingMode$.subscribe((response) => {
      if (response && this.currentPlatform === "android") {
        this.presentToast("Reviewing mode. Use long press on specific component");
        this.guesture.enable(true);
      } else if (!response && this.currentPlatform === "android") {
        this.presentToast("Exit reviewing mode");
        this.guesture.enable(false);
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  public useLongPress() {
    this.guesture = this.gestureCtrl.create({
      el: document.body,
      threshold: 0,
      gestureName: "long-press",
      onStart: (ev) => {
        this.longPressActive = true;
        this.longPressAction(ev);
      },
      onEnd: (ev) => {
        this.longPressActive = false;
      },
    });
  }

  private longPressAction(ev: GestureDetail) {
    setTimeout(() => {
      this.zone.run(() => {
        if (this.longPressActive === true) {
          this.targetRow = this.getTargetRow(ev.event);
          this.isTextType = this.isText(this.targetRow);
          this.longPressActive = false;
          this.presentActionSheet();
        }
      });
    }, 1000);
  }

  async presentActionSheet() {
    const buttons = [
      {
        text: "Saggest change",
        handler: async () => {
          const modal = await this.modal.create({
            component: SuggestFormComponent,
            cssClass: "my-custom-modal",
            componentProps: {
              isComment: false,
              isSuggest: true,
              isInPopUp: true,
              targetRow: this.targetRow,
            },
            showBackdrop: false,
          });
          await modal.present();
        },
      },
      {
        text: "Leave comment",
        handler: async () => {
          const modal = await this.modal.create({
            component: SuggestFormComponent,
            cssClass: "my-custom-modal",
            componentProps: {
              targetRow: this.targetRow,
              isInPopUp: true,
            },
            showBackdrop: false,
          });
          await modal.present();
        },
      },
    ];
    if (!this.isTextType) {
      buttons.shift();
    }
    this.actionSheet = await this.actionSheetController.create({
      cssClass: "my-custom-class",
      buttons: [
        ...buttons,
        {
          text: "See existing comments",
          handler: () => {
            this.router.navigate(["/", "existing-comments"]);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    if (this.isTextType) {
      this.actionSheet["header"] = `text: ${this.targetRow?.value}`;
    }
    await this.actionSheet.present();
  }

  public getTargetRow(e: Event | TouchEvent): FlowTypes.TemplateRow | null {
    let result = null;
    if (e["path"]) {
      result = e["path"].find((c) => c.localName === "plh-template-component")?.__ngContext__[21];
      return result;
    } else {
      return result;
    }
  }

  public isText(row: FlowTypes.TemplateRow): boolean {
    if (row && row.type) {
      if (row.type === "title" || row.type === "subtitle" || row.type === "text") {
        return true;
      } else {
        return false;
      }
    }
  }
}
