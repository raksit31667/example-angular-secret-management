import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationProvider {

  constructor(private http: HttpClient) { }

  private configPath = 'assets/config/app.config.json';

  private configValues: any = null;

  get config() {
    return this.configValues;
  }

  public load(): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get(this.configPath).subscribe(response => {
        console.log('configValues', response);
        this.configValues = response;
        resolve(true);
      });
    });
  }
}
