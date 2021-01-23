import { Injectable } from '@angular/core';
import {AngularFireMessaging} from "@angular/fire/messaging";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {

  }

  requestToken() {
    this.angularFireMessaging.requestToken
      .subscribe(token => {
        console.log('token', token);
      });
  }

  subscribeToForegroundNotification() {
    this.angularFireMessaging.messages.subscribe((message: any) => {
      console.log('message', message);
      this.currentMessage.next(message);
    });
  }
}
