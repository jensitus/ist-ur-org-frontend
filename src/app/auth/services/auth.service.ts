import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../user/model/user';
import { BehaviorService } from '../../common/services/behavior.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiOrgUrl = environment.api_org_url;
  retVal: any;

  constructor(
    private http: HttpClient,
    private behaviorService: BehaviorService
  ) { }

  register(user: User) {
    return this.http.post(this.apiOrgUrl + '/api/auth/signup', user);
  }

  forgotPassword(email: string) {
    return this.http.post(this.apiOrgUrl + '/api/auth/reset_password/create', email, {responseType: 'text'});
  }

  resetPassword(user: User, token: string) {
    return this.http.put(this.apiOrgUrl + '/api/auth/reset_password/' + token, user, {responseType: 'text'});
  }

}
