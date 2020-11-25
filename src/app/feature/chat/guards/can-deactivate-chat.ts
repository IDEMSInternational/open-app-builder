import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatPage } from '../components/chat.page';
import { ChatActionType } from '../models';
import { OfflineChatService } from '../services/offline/offline-chat.service';

@Injectable()
export class CanDeactivateChat implements CanDeactivate<ChatPage> {
  constructor(private alertController: AlertController, private chatService: OfflineChatService) {}

  async canDeactivate(
    component: ChatPage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Promise<boolean> {
    /* If navigating away because of a chat action don't show alert */
    if (component.lastReceivedMsg && component.lastReceivedMsg.actions) {
      const navigationAction = component.lastReceivedMsg.actions.find((action) => action.type === ChatActionType.NAVIGATE);
      if (navigationAction) {
        return true;
      }
    }

    /* If flow has finished then don't show alert */
    const flowStatusEvents = this.chatService.flowStatus$.getValue();
    const latestFlowEvent = flowStatusEvents[flowStatusEvents.length - 1];
    if (latestFlowEvent.status === "completed") {
      return true;
    }

    const alert = await this.alertController.create({
        header: "Are you sure you want to leave?",
        message: "If you leave part way through you will loose your progress",
        buttons: [
          {
            text: "OK",
            role: "ok"
          },
          {
            text: "Cancel",
            role: "cancel"
          }
        ]
    });
    alert.present();
    const event = await alert.onDidDismiss();
    return event.role === "ok";
  }
}