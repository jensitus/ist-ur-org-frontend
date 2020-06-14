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

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) {
  }

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

  checkAuthToken(token: string): Observable<MessageOrg> {
    return this.http.post<MessageOrg>(this.apiUrl + '/api/auth/auth/check_auth_token', token);
  }

  followThisUser(follower: number, followed: number): Observable<FollowerShip> {
    return this.http.post<FollowerShip>(this.apiUrl + '/api/users/followship/create/' + follower, followed);
  }

  unFollowThisUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/users/followship/delete/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/api/users/' + id);
  }

  checkIfOneIsFollowingTheOther(follower_id: number, followed_id: number): Observable<FollowerShip> {
    return this.http.get<FollowerShip>(`${this.apiUrl}/api/users/followership/follower/${follower_id}/followed/${followed_id}/`);
  }

}
