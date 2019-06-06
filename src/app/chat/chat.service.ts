import { Injectable } from '@angular/core';
// TODO: add socket.io to package.json
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from './message.model';
import * as events from '../../../events';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  [x: string]: any;

  private socket = io('http://localhost:3000');
  constructor() { }

  userConnect(user) {
    this.socket.emit(events.USER_CONNECTED, { user: user });
  }

  sendMessage(user, message) {
    this.socket.emit(events.MESSAGE_SENT, { message: message, from: user });
  }

  sendPrivateMessage(to, from, message) {
    console.log('sending private message');
    console.log('from: ' + from.username);
    console.log('to: ' + to.username);
    console.log(message);
    this.socket.emit(events.PRIVATE_MESSAGE, { message: message, to: to, from: from, });
  }

  getMessages() {
    const observable = new Observable<Message>(observer => {
      this.socket.on(events.MESSAGE_RECEIVED, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getPrivateMessages() {
    const observable = new Observable<any>(observer => {
      this.socket.on(events.PRIVATE_MESSAGE, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  logout() {
    this.socket.emit(events.LOGOUT);
  }

  getUsers() {
    const observable = new Observable<any>(observer => {
      this.socket.on(events.UPDATE_USERS, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
