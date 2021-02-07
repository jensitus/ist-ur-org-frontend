import { Component, OnInit } from '@angular/core';
import {User} from '../../user/model/user';
import {BehaviorService} from '../services/behavior.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  reload: boolean;


  constructor(
    private behaviorService: BehaviorService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getNoticedAfterLoginOrLogout();
  }

  private getNoticedAfterLoginOrLogout() {
    this.behaviorService.loginSubject.subscribe(res => {
      this.reload = res;
      console.log('reload', this.reload);
      if (this.reload) {
        this.getCurrentUser();
      }
    });
  }

  private getCurrentUser() {
    console.log('get currentUser after reload');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser', this.currentUser);
  }


}
