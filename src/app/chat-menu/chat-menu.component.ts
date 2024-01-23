import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenu {
  showChatMenu: boolean = false;
  showChat: boolean = false;
  showFriends: boolean = false;

  openChatMenu() {
    this.showChatMenu = !this.showChatMenu;
  }
  openChat() {
    this.showChat = true;
    this.showFriends = false;
  }

  openFriends() {
    this.showChat = false;
    this.showFriends = true;
  }
}
