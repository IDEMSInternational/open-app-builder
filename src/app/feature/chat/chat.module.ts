import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChatPageRoutingModule } from "./chat-routing.module";
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { SharedModule } from "src/app/shared/shared.module";
import { ChatPage } from "./components/chat.page";
import { ChatActionComponent } from "./components/chat-action/chat-action.component";
import { ChatResponsesComponent } from './components/chat-responses/chat-responses.component';
import { ResponsesModalComponent } from './components/chat-responses/responses-modal/responses-modal.component';
import { CanDeactivateChat } from './guards/can-deactivate-chat';

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
    LottieModule.forRoot({ player: lottiePlayerFactory, useCache: true }),
  ],
  declarations: [ChatPage, ChatActionComponent, ChatResponsesComponent, ResponsesModalComponent],
  providers: [CanDeactivateChat],
})
export class ChatPageModule {}
