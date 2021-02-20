import {Component, OnDestroy, OnInit} from '@angular/core';
import {Posting} from '../model/Posting';
import {PostingService} from '../services/posting.service';
import {takeUntil} from 'rxjs/operators';
import {UserService} from '../../user/services/user.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-show-posting-list',
  templateUrl: './show-posting-list.component.html',
  styleUrls: ['./show-posting-list.component.css']
})
export class ShowPostingListComponent implements OnInit, OnDestroy {

  postings: Posting[];
  posting: Posting;
  private notifier$ = new Subject();

  constructor(
    private postingService: PostingService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getPostingList();
  }

  private getPostingList() {
    this.postingService.getAllPostings().pipe(
      takeUntil(this.notifier$)
    ).subscribe(result => {
      this.postings = result;
      this.addUsernameToPosting();
      console.log('postings', this.postings);
    });
  }

  private addUsernameToPosting() {
    if (this.postings) {
      for (const p of this.postings) {
        this.userService.getUserById(p.user_id).pipe(
          takeUntil(this.notifier$)
        ).subscribe(pu => {
          p.username = pu.name;
        });
      }
    }
  }

  private getPostingUser(): void {
    this.userService.getUserById(this.posting.user_id).pipe(
      takeUntil(this.notifier$)
    ).subscribe(pu => {
      // this.postingUser = pu;
    });
  }

  ngOnDestroy(): void {
   this.notifier$.next();
  }

}
