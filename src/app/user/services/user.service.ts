import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {MessageOrg} from '../../common/model/MessageOrg';
import {FollowerShip} from '../model/follower-ship';
import {BehaviorService} from '../../common/services/behavior.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpReturnValue: any;
  apiOrgUrl = environment.api_org_url;
  retVal: any;

  constructor(
    private http: HttpClient,
    private behaviorService: BehaviorService
    ) {
  }

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

  checkTokenExpired(token: string) {
    return this.httpReturnValue = this.http.get(`${this.apiOrgUrl}/api/reset_password/check_token/${token}`, {responseType: 'text'});
  }



  checkAuthToken(token: string): Observable<MessageOrg> {
    console.log(token);
    return this.http.post<MessageOrg>(this.apiOrgUrl + '/api/module/users/check_auth_token', {access_token: token});
  }

  followThisUser(follower: number, followed: number): Observable<FollowerShip> {
    return this.http.post<FollowerShip>(this.apiOrgUrl + '/api/users/followship/create/' + follower, followed);
  }

  unFollowThisUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiOrgUrl}/api/users/followship/delete/${id}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.apiOrgUrl + '/api/users/' + id);
  }

  checkIfOneIsFollowingTheOther(follower_id: number, followed_id: number): Observable<FollowerShip> {
    return this.http.get<FollowerShip>(`${this.apiOrgUrl}/api/users/followership/follower/${follower_id}/followed/${followed_id}/`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiOrgUrl}/api/users/${user.id}/update`, user);
  }

}
