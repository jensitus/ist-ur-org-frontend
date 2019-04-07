import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  public menuItems: MenuItem[];

  ngOnInit() {
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

}
