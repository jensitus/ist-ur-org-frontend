import { Injectable } from '@angular/core';
import {User} from '../../user/model/user';
import {UserService} from '../../user/services/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  currentUser: User;
  data: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  checkAuthToken() {
    this.getCurrentUser();
    if (this.currentUser == null) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.checkAuthToken(this.currentUser.accessToken).subscribe(data => {
      this.data = data;
      console.log('authToken OK', data);
    }, error => {
      console.log('authToken ERROR', error);
      // this.router.navigate(['/login']);
    });
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
