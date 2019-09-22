import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../model/user';
import {BehaviorService} from './behavior.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.api_url;

  constructor(
    private http: HttpClient,
    private behaviorService: BehaviorService
  ) { }

  public login(user: User) {
    return this.http.post(this.apiUrl + '/api/auth/signin', user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.behaviorService.setLoginSubject(true);
  }
}
