import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChatPageRoutingModule } from "./chat-routing.module";

import { ChatPage } from "./chat.page";

import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatActionComponent } from './chat-action/chat-action.component';
import { BrowserModule } from '@angular/platform-browser';

// Note we need a separate function as it's required
// by the AOT compiler.
export function lottiePlayerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChatPageRoutingModule,
    LottieModule.forRoot({ player: lottiePlayerFactory, useCache: true })
  ],
  declarations: [ChatPage, ChatActionComponent],
  providers: [],
})
export class ChatPageModule {}
