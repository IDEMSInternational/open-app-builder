import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'plh-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public offlineChatEnabled = false;

  public useButtonHomeScreen = false;

  constructor(private chatService: ChatService) { }

  toggleButtonHomeScreen() {
    localStorage.setItem("home_screen.use_button_version", "" + this.useButtonHomeScreen);
  }

  toggleOfflineChat() {
    this.chatService.init(this.offlineChatEnabled);
  }

  ngOnInit() {
    this.offlineChatEnabled = this.chatService.isUsingOffline();
    this.useButtonHomeScreen = localStorage.getItem("home_screen.use_button_version") === "true";
  }

}
