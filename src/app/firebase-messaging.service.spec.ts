import { TestBed } from '@angular/core/testing';

import { FirebaseMessagingService } from './firebase-messaging.service';
import {AngularFireMessaging} from "@angular/fire/messaging";

describe('FirebaseMessagingService', () => {
  let service: FirebaseMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireMessaging, useValue: {
            requestToken: {
              subscribe: jasmine.createSpy('subscribe')
            },
            messages: {
              subscribe: jasmine.createSpy('subscribe')
            }
          }
        },
      ]
    });
    service = TestBed.inject(FirebaseMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
