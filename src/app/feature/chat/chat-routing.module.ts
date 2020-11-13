import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatActionComponent } from './chat-action/chat-action.component';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  },
  {
    path: 'action/:actionType',
    component: ChatActionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
