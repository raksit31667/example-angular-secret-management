import {Component, OnInit} from '@angular/core';
import {FirebaseMessagingService} from "./firebase-messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'example-angular-order';
  currentMessage: any;

  constructor(private firebaseMessagingService: FirebaseMessagingService) {

  }

  ngOnInit(): void {
    this.firebaseMessagingService.requestToken();
    this.firebaseMessagingService.subscribeToForegroundNotification();
    this.currentMessage = this.firebaseMessagingService.currentMessage;
  }
}
