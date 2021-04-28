import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {UploadType} from '../../common/upload-type.enum';
import {BehaviorService} from '../../common/services/behavior.service';
import {PostingService} from '../../posting/services/posting.service';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit, OnDestroy {

  avatar = UploadType.AVATAR;
  userId: string;
  userToShow: User;
  currentUser: User;
  microposts: any;
  private reload: boolean;
  private notifier$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private behaviorService: BehaviorService,
    private postingService: PostingService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.activatedRoute.params.pipe(takeUntil(this.notifier$)).subscribe(params => {
      this.userId = params['id'];
    });
    this.getUserToShow();
    this.reloadUser();
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser', this.currentUser);
  }

  private reloadUser() {
    this.behaviorService.uploadSubject.pipe(takeUntil(this.notifier$)).subscribe(res => {
      this.reload = res;
      if (this.reload) {
        this.getUserToShow();
      }
    });
  }

  getUserToShow(): void {
    this.userService.getUserById(this.userId).pipe(takeUntil(this.notifier$)).subscribe(u => {
      this.userToShow = u;
      console.log('userToShow', this.userToShow);
    });
  }

  getMicropostsForUser(): any {
    this.postingService.getMicropostsByUser(this.userId).pipe(takeUntil(this.notifier$)).subscribe(m => {
      this.microposts = m;
    });
  }

}
