import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {UploadType} from '../../common/upload-type.enum';
import {BehaviorService} from '../../common/services/behavior.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  avatar = UploadType.AVATAR;
  userId: string;
  userToShow: User;
  currentUser: User;
  private reload: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private behaviorService: BehaviorService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.getUserToShow();
    this.reloadUser();
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser', this.currentUser);
  }

  private reloadUser() {
    this.behaviorService.uploadSubject.subscribe(res => {
      this.reload = res;
      if (this.reload) {
        this.getUserToShow();
      }
    });
  }

  getUserToShow(): void {
    this.userService.getUserById(this.userId).subscribe(u => {
      this.userToShow = u;
      console.log('userToShow', this.userToShow);
    });
  }

}
