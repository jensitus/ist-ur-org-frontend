import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {MessageOrg} from '../../common/model/MessageOrg';
import {FollowerShip} from '../model/follower-ship';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpReturnValue: any;

  apiOrgUrl = environment.api_org_url;

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post(this.apiOrgUrl + '/api/auth/signup', user);
  }

  forgotPassword(email: string) {
    return this.http.post(this.apiOrgUrl + '/api/reset_password/create', email, {responseType: 'text'});
  }

  checkTokenExpired(token: string) {
    return this.httpReturnValue = this.http.get(`${this.apiOrgUrl}/api/reset_password/check_token/${token}`, {responseType: 'text'});
  }

  resetPassword(user: User, token: string) {
    return this.http.put(this.apiOrgUrl + '/api/auth/reset_password/' + token, user, {responseType: 'text'});
  }

  checkAuthToken(token: string): Observable<MessageOrg> {
    console.log(token);
    return this.http.post<MessageOrg>(this.apiOrgUrl + '/api/auth/users/check_auth_token', {access_token: token});
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

  uploadAvatar(userId: string, file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    const url = `${this.apiOrgUrl}/api/users/${userId}/avatar`;
    console.log(url);
    return this.http.post(`${this.apiOrgUrl}/api/users/${userId}/avatar`, formData);
  }

}
