import { TestBed } from '@angular/core/testing';

import { AppConfigurationProvider } from './app.config.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('AppConfiguration', () => {
  let service: AppConfigurationProvider;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AppConfigurationProvider);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should load the configuration from file', () => {
    // Given
    const mockConfig = {
      backgroundColor: 'red'
    };

    // When
    service.load().then(() => {
      expect(service.config).toEqual(mockConfig);
    })

    // Then
    const req = httpMock.expectOne('assets/config/app.config.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);
    httpMock.verify();
  });
});
