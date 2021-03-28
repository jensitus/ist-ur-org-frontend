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

  @Input() micropostId: string;
  comments: Comment[];
  reload = false;

  constructor(
    private commentService: CommentService,
    private behaviorService: BehaviorService
  ) { }

  ngOnInit(): void {
    console.log('this.micropostId', this.micropostId);
    this.getCommentList();
    this.getReloadOrderFromBehavior();
  }

  private getCommentList() {
    this.commentService.getByPostingId(this.micropostId).subscribe(res => {
      this.comments = res;
      console.log('this.comments', this.comments);
    });
  }

  private getReloadOrderFromBehavior() {
    this.behaviorService.commentSubject.subscribe(res => {
      this.reload = res;
      if (this.reload) {
        this.getCommentList();
      }
    });
  }

}
