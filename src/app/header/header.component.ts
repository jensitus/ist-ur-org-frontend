import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import {User} from '../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor() { }
  public menuItems: MenuItem[];

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
  }

  openMobileNavbar() {}

}
