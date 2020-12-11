import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChatPageRoutingModule } from "./chat-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ChatPage } from "./components/chat.page";
import { ChatActionComponent } from "./components/chat-action/chat-action.component";
import { ChatResponsesComponent } from './components/chat-responses/chat-responses.component';
import { ResponsesModalComponent } from './components/chat-responses/responses-modal/responses-modal.component';
import { CanDeactivateChat } from './guards/can-deactivate-chat';
import { LottieModule } from "ngx-lottie";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChatPageRoutingModule,
    LottieModule,
  ],
  declarations: [ChatPage, ChatActionComponent, ChatResponsesComponent, ResponsesModalComponent],
  providers: [CanDeactivateChat],
})
export class ChatPageModule {}
