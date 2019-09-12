import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import {User} from '../model/user';
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
  public menuItems: MenuItem[];

  ngOnInit() {
    this.getCurrentUser();
    this.menuItems = [
      {
          label: 'Login',
          icon: 'pi pi-sign-in'
      },
      {
          label: 'Register',
          icon: 'pi pi-user-plus'
      }
    ];
    this.afterLogin();
  }

  openMobileNavbar() {}

  afterLogin() {
    this.behaviorService.loginSubject.subscribe(res => {
      this.reload = res;
      if (this.reload) {
        this.getCurrentUser();
      }
    });
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


}
