import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ChatService } from './chat.service';
import { Message } from './message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Array<Message> = [];
  message: String;
  privateMessage: String;
  privateMessages: Map<String, Array<Message>> = new Map<String, Array<Message>>();
  // TODO: create an user type
  user: any;
  onlineUsers: Array<any>;
  to: String;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    // determine the username of the logged in user
    this.authService.me().subscribe((user) => {
      this.user = user.user;
      this.chatService.userConnect(user.user);
    });

    // receive messages and display them
    this.chatService.getMessages().subscribe((data) => {
      if (data.from.username === this.user.username) {
        data.color = "primary";
      }
      else {
        data.color = "accent";
      }
      this.messages.push(data);
    });

    // receive private messages
    this.chatService.getPrivateMessages().subscribe((data) => {
      let from = data.from;
      let to = data.to;
      if (from.username === this.user.username) {
        data.color = "primary";
        if (!this.privateMessages[to.username]) {
          this.privateMessages[to.username] = [];
        }
        this.privateMessages[to.username].push(data);
      } else if (to.username === this.user.username) {
        data.color = "accent";
        if (!this.privateMessages[from.username]) {
          this.privateMessages[from.username] = [];
        }
        this.privateMessages[from.username].push(data);
        let notification = "New message from " + from.username;
        this.messages.push({message: notification, from: {username: "SERVER"}, color: "red"});
      }
    });

    // receive a list of online users
    this.chatService.getUsers().subscribe((data) => {
      this.onlineUsers = data;
      for (let username of this.onlineUsers) {
        console.log(username);
      }
    });
  }
	
  sendMessage() {
    this.chatService.sendMessage(this.user, this.message);
    this.message = '';
  }
  sendPrivateMessage() {
    let toObject = {username: this.to};
    this.chatService.sendPrivateMessage(toObject, this.user, this.privateMessage);
    this.privateMessage = '';
  }
}
