import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  public authURL = 'http://localhost:3000/auth/v1/';
  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data) {
    return this.httpClient.post(this.authURL, data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.httpClient.post(`${this.authURL}isAuthenticated`, {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    }).map( res => res['isAuthenticated']).toPromise<boolean>();
  }
}
