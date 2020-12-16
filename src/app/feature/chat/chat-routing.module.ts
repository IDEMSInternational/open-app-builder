import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatActionComponent } from "./components/chat-action/chat-action.component";
import { ChatPage } from "./components/chat.page";
import { CanDeactivateChat } from "./guards/can-deactivate-chat";

const routes: Routes = [
  // default chat page flow
  {
    path: "",
    redirectTo: "chat_content_flow",
  },
  {
    path: "action/:actionType",
    component: ChatActionComponent,
  },
  {
    path: ":flowName",
    component: ChatPage,
    canDeactivate: [CanDeactivateChat],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
