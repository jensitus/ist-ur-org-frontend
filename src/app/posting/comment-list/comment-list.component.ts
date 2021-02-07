import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../services/comment.service';
import {Comment} from '../model/comment';
import {BehaviorService} from '../../common/services/behavior.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() postingId: string;
  comments: any;
  reload = false;

  constructor(
    private commentService: CommentService,
    private behaviorService: BehaviorService
  ) { }

  ngOnInit(): void {
    console.log('comment list component', this.postingId);
    this.getCommentList();
    this.getReloadOrderFromBehavior();
  }

  private getCommentList() {
    this.commentService.getByPostingId(this.postingId).subscribe(res => {
      this.comments = res;
      console.log('comments res', res);
      console.log('these.comments', this.comments);
    });
  }

  private getReloadOrderFromBehavior() {
    this.behaviorService.commentSubject.subscribe(res => {
      this.reload = res;
      console.log('this.reload', this.reload);
      if (this.reload) {
        this.getCommentList();
      }
    });
  }

}
