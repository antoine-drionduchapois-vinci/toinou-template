import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly http: HttpClient) {}

  getHello() {
    const result = lastValueFrom(this.http.get(`${environment.API_URL}`)).then(
      (r) => {
        console.log(r);
      }
    );
  }

  getUsers() {
    const result = lastValueFrom(
      this.http.get(`${environment.API_URL}/user`)
    ).then((r) => {
      console.log(r);
    });
  }
}
