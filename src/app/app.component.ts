import {Component, OnInit} from '@angular/core';
import {FirebaseMessagingService} from "./firebase-messaging.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentMessage: any;

  constructor(public translateService: TranslateService, private firebaseMessagingService: FirebaseMessagingService) {
    translateService.addLangs(['en', 'th']);
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.firebaseMessagingService.requestToken();
    this.firebaseMessagingService.subscribeToForegroundNotification();
    this.currentMessage = this.firebaseMessagingService.currentMessage;
  }

  onSelectLanguage(language: string) {
    this.translateService.use(language);
  }
}
