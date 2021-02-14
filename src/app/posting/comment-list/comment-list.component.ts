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
    this.getCommentList();
    this.getReloadOrderFromBehavior();
  }

  private getCommentList() {
    this.commentService.getByPostingId(this.postingId).subscribe(res => {
      this.comments = res;
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
