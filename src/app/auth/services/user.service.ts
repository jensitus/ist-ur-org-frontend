import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpReturnValue: any;

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.apiUrl + '/api/auth/signup', user);
  }

  forgotPassword(email: string) {
    return this.http.post(this.apiUrl + '/api/auth/reset_password', email, {responseType: 'text'});
  }

  checkTokenExpired(token: string, email: string) {
    return this.httpReturnValue = this.http.get(`${this.apiUrl}/api/auth/reset_password/${token}?email=` + email, {responseType: 'text'});
  }

  resetPassword(user: User, token: string, email: string) {
    return this.http.put(this.apiUrl + '/api/auth/reset_password/' + token + '?email=' + email, user, {responseType: 'text'});
  }

  checkAuthToken(token: string): Observable<String> {
    return this.http.post<String>(this.apiUrl + '/api/auth/auth/check_auth_token', token);
  }

}
