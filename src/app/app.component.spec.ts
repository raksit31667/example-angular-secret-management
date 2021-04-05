import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {FirebaseMessagingService} from "./firebase-messaging.service";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {LanguageSelectComponent} from "./i18n/language-select/language-select.component";
import {AppConfigurationProvider} from "./app.config.service";

describe('AppComponent', () => {

  let firebaseMessagingService: FirebaseMessagingService;
  let translateService: TranslateService;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

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
          provide: AppConfigurationProvider, useValue: {
            config: {
              backgroundColor: 'red'
            }
          }
        },
        TranslateService,
      ],
      declarations: [
        AppComponent,
        LanguageSelectComponent
      ],
    }).compileComponents();

    firebaseMessagingService = TestBed.inject(FirebaseMessagingService);
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it(`should have English and Thai as available languages`, () => {
    // When
    fixture.detectChanges();

    // Then
    expect(component.translateService.getLangs()).toEqual(['en', 'th']);
  });

  it(`should set default language to English`, () => {
    // When
    fixture.detectChanges();

    // Then
    expect(component.translateService.defaultLang).toEqual('en');
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

  it('should call translateService.use when onSelectLanguage triggers from LanguageSelectComponent', () => {
    // Given
    spyOn(translateService, 'use');

    // When
    component.onSelectLanguage('th');

    // Then
    expect(translateService.use).toHaveBeenCalledWith('th');
  });

  it(`should set background color based on app configuration`, () => {
    // When
    fixture.detectChanges();

    // Then
    expect(fixture.nativeElement.ownerDocument.body.style.backgroundColor).toEqual('red');
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
