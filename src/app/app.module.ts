import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireMessagingModule} from "@angular/fire/messaging";
import {ServiceWorkerModule} from "@angular/service-worker";
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp({
    //   apiKey: '<your-key>',
    //   authDomain: '<your-project-authdomain>',
    //   databaseURL: '<your-database-URL>',
    //   projectId: '<your-project-id>',
    //   storageBucket: '<your-storage-bucket>',
    //   messagingSenderId: '<your-messaging-sender-id>'
    // }),
    // AngularFireMessagingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
