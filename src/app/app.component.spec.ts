import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {FirebaseMessagingService} from "./firebase-messaging.service";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, Observable, of} from "rxjs";

describe('AppComponent', () => {

  let firebaseMessagingService: FirebaseMessagingService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader, useClass: FakeTranslateLoader
          }
        })
      ],
      providers: [
        {
          provide: FirebaseMessagingService, useValue: {
            requestToken() {},
            subscribeToForegroundNotification() {},
            currentMessage: new BehaviorSubject(null)
          }
        },
        {
          provide: TranslateService, useClass: TranslateService
        }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    firebaseMessagingService = TestBed.inject(FirebaseMessagingService);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
     // When
    const app = fixture.componentInstance;

    // Then
    expect(app).toBeTruthy();
  });

  it(`should have English and Thai as available languages`, () => {
    // When
    const app = fixture.componentInstance;

    // Then
    expect(app.translateService.getLangs()).toEqual(['en', 'th']);
  });

  it(`should set default language to English`, () => {
    // When
    const app = fixture.componentInstance;

    // Then
    expect(app.translateService.defaultLang).toEqual('en');
  });

  it('should request token, subscribe for, and render Firebase messaging', () => {
    // Given
    spyOn(firebaseMessagingService, 'requestToken');
    spyOn(firebaseMessagingService, 'subscribeToForegroundNotification');
    firebaseMessagingService.currentMessage.next('this is a new notification' as any);

    // When
    fixture.detectChanges();

    // Then
    expect(firebaseMessagingService.requestToken).toHaveBeenCalled();
    expect(firebaseMessagingService.subscribeToForegroundNotification).toHaveBeenCalled();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#current-message').textContent).toEqual('Message: "this is a new notification"');
  });
});

class FakeTranslateLoader extends TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({
      "app": {
        "message": "Message"
      }
    });
  }
}
