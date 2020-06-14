import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  userId: number;
  userToShow: User;
  currentUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.userService.getUserById(this.userId).subscribe(u => {
      this.userToShow = u;
    });
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
