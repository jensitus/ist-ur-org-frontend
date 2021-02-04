import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostingService} from '../services/posting.service';
import {Posting} from '../model/Posting';
import {Location} from '@angular/common';
import {User} from '../../user/model/user';
import {UserService} from '../../user/services/user.service';
import {finalize} from 'rxjs/operators';

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
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postingService: PostingService,
    private location: Location,
    private userService: UserService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.postingId = params['id'];
    });
  }

  ngOnInit() {
    this.loading = true;
    this.getCurrentUser();
    this.postingService.getById(this.postingId).pipe(
      finalize(() => {
        this.getPostingUser();
        this.loading = false;
      })
    ).subscribe(result => {
      this.posting = result;
      console.log('this.posting', this.posting);
      console.log('this.posting.user_id', this.posting.user_id);
    });
  }

  backLink() {
    this.location.back();
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  private getPostingUser(): void {
    this.userService.getUserById(this.posting.user_id).subscribe(pu => {
      this.postingUser = pu;
    });
  }

}
