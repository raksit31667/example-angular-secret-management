import { Injectable } from '@angular/core';
// import {AngularFireMessaging} from "@angular/fire/messaging";
import {BehaviorSubject} from "rxjs";
import {SwPush} from "@angular/service-worker";
import firebase from 'firebase';
import 'firebase/messaging';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private swPush: SwPush) {

  }

  requestToken() {
    // this.angularFireMessaging.requestToken
    //   .subscribe(token => {
    //     console.log('token', token);
    //   });
    this.swPush.requestSubscription({
      serverPublicKey: 'BEGbWDBxLYwnAATI12HgFc7Y-kaX40V3_Z3S5P88J0kbX9wak6vW7G4q6T5a7iCLwWbQiS-43w3kphURkElmZig'
    }).then(subscription => {
      console.log('subscription', JSON.stringify(subscription));
    });
  }

  subscribeToForegroundNotification() {
    // this.angularFireMessaging.messages.subscribe((message: any) => {
    //   console.log('message', message);
    //   this.currentMessage.next(message);
    // });
    this.swPush.messages.subscribe(message => {
      console.log('message', message);
    });
    this.swPush.notificationClicks.subscribe(({action, notification}) => {
      window.open(notification.data.url);
    });
  }

  unsubscribe() {
    this.swPush.unsubscribe();
  }
}
