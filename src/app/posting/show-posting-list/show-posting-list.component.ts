import {Component, OnDestroy, OnInit} from '@angular/core';
import {Posting} from '../model/Posting';
import {PostingService} from '../services/posting.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {UserService} from '../../user/services/user.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-show-posting-list',
  templateUrl: './show-posting-list.component.html',
  styleUrls: ['./show-posting-list.component.css']
})
export class ShowPostingListComponent implements OnInit, OnDestroy {

  postingMap: Map<number, Posting[]>;
  postings: Posting[];
  posting: Posting;
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
    this.getPostingList();
  }

  ngOnDestroy(): void {
    this.notifier$.next();
  }

  getPostingList(limit?: number, offset?: number) {
    this.loading = true
    this.postingService.getAllPostings(limit, offset).pipe(
      takeUntil(this.notifier$),
      finalize(() => this.loading = false)
    ).subscribe(result => {
      this.postingMap = result;
      this.count = result.count;
      this.postings = result.postings;
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
    if (this.postings.values()) {
      for (const p of this.postings) {
        this.userService.getUserById(p.user_id).pipe(
          takeUntil(this.notifier$)
        ).subscribe(pu => {
          p.username = pu.name;
        });
      }
    }
  }

}
