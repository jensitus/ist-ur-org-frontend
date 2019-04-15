import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.apiUrl + '/api/auth/signup', user);
  }

}
