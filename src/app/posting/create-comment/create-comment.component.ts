import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Posting} from '../model/Posting';
import {CreateCommentDto} from '../model/create-comment-dto';
import {CommentService} from '../services/comment.service';
import {BehaviorService} from '../../common/services/behavior.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  @Input() userId: string;
  @Input() postingId: string;
  commentForm: FormGroup;
  loading = false;
  submitted = false;
  comment: Comment;
  comments: any;
  createCommentDto: CreateCommentDto;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private behaviorService: BehaviorService
  ) { }

  ngOnInit(): void {
    this.getCommentForm();
  }

  onCommentSubmit() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    this.loading = true;
    this.createCommentDto = {
      body: this.commentForm.value.body,
      userId: this.userId,
      postingId: this.postingId
    };
    console.log('this.createCommentDto', this.createCommentDto);
    this.commentService.create(this.createCommentDto).subscribe(resultat => {
      console.log(resultat);
      this.behaviorService.setCommentSubject(true);
      this.commentForm.reset();
      this.getCommentForm();
      this.loading = false;
    });
  }

  get d() {
    return this.commentForm.controls;
  }

  private getCommentForm() {
    this.commentForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }

}
