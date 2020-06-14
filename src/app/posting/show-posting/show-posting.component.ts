import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostingService} from '../services/posting.service';
import {Posting} from '../model/Posting';
import {Location} from '@angular/common';
import {User} from '../../user/model/user';
import {UserService} from '../../user/services/user.service';

@Component({
  selector: 'app-show-posting',
  templateUrl: './show-posting.component.html',
  styleUrls: ['./show-posting.component.css']
})
export class ShowPostingComponent implements OnInit {

  postingId: string;
  posting: Posting;
  currentUser: User;
  postingUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postingService: PostingService,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.activatedRoute.params.subscribe(params => {
      this.postingId = params['id'];
    });
    this.postingService.getById(this.postingId).subscribe(result => {
      this.posting = result;
      this.userService.getUserById(this.posting.userId).subscribe(pu => {
        this.postingUser = pu;
      });
    });
  }

  backLink() {
    this.location.back();
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
