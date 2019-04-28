import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  public login(user: User) {
    return this.http.post(this.apiUrl + '/api/auth/signin', user);
  }
}
