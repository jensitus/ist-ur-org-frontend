import {Component, OnDestroy, OnInit} from '@angular/core';
import {Micropost} from '../model/Micropost';
import {PostingService} from '../services/posting.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {UserService} from '../../user/services/user.service';
import {Subject} from 'rxjs';
import {User} from '../../user/model/user';

@Component({
  selector: 'app-show-posting-list',
  templateUrl: './show-posting-list.component.html',
  styleUrls: ['./show-posting-list.component.css']
})
export class ShowPostingListComponent implements OnInit, OnDestroy {

  micropostMap: Map<number, Micropost[]>;
  currentUser: User;
  microposts: Micropost[];
  micropost: Micropost;
  count: number;
  private notifier$ = new Subject();
  loading = false;
  page = 1;
  offset = 0;
  MULTIPLYING_FACTOR = 10;

  constructor(
    private postingService: PostingService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getPostingList();
  }

  ngOnDestroy(): void {
    this.notifier$.next();
  }

  getPostingList(limit?: number, offset?: number) {
    this.loading = true;
    this.postingService.getAllPostings(limit, offset).pipe(
      takeUntil(this.notifier$),
      finalize(() => this.loading = false)
    ).subscribe(result => {
      this.micropostMap = result;
      this.count = result.count;
      this.microposts = result.microposts;
      this.addUsernameToPosting();
    });
  }

  getThePageNumber() {
    if (this.page === 1) {
      this.offset = 0;
    } else if (this.page >= 2 ) {
      this.offset = (this.page - 1 ) * this.MULTIPLYING_FACTOR;
    }
    this.getPostingList(10, this.offset);
  }

  private addUsernameToPosting() {
    if (this.microposts.values()) {
      for (const p of this.microposts) {
        this.userService.getUserById(p.user_id).pipe(
          takeUntil(this.notifier$)
        ).subscribe(pu => {
          p.username = pu.name;
        });
      }
    }
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
