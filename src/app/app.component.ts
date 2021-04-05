import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {FirebaseMessagingService} from "./firebase-messaging.service";
import {TranslateService} from "@ngx-translate/core";
import {AppConfigurationProvider} from "./app.config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  currentMessage: any;

  constructor(public translateService: TranslateService,
              private firebaseMessagingService: FirebaseMessagingService,
              private elementRef: ElementRef,
              private appConfigurationProvider: AppConfigurationProvider) {
    translateService.addLangs(['en', 'th']);
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.firebaseMessagingService.requestToken();
    this.firebaseMessagingService.subscribeToForegroundNotification();
    this.currentMessage = this.firebaseMessagingService.currentMessage;
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.appConfigurationProvider.config.backgroundColor;
  }

  onSelectLanguage(language: string) {
    this.translateService.use(language);
  }
}
