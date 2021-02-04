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

  public login(user: User) {
    this.retVal = {
      message: 'aber hallo',
      trueOrFalse: true
    };
    return this.http.post(this.apiOrgUrl + '/api/auth/login', user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.behaviorService.setLoginSubject(true);
  }
}
