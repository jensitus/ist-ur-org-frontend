import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Posting} from '../model/Posting';
import {PostingService} from '../services/posting.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-create-posting',
  templateUrl: './create-posting.component.html',
  styleUrls: ['./create-posting.component.css']
})
export class CreatePostingComponent implements OnInit, OnDestroy {

  postingForm: FormGroup;
  loading = false;
  submitted = false;
  posting: Posting;
  subscription = Subscription.EMPTY;

  constructor(
    private formBuilder: FormBuilder,
    private postingService: PostingService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getPostingForm();
  }

  get d() {
    return this.postingForm.controls;
  }

  onPostingSubmit() {
    this.submitted = true;
    if (this.postingForm.invalid) {
      return;
    }
    this.loading = true;
    this.posting = {
      title: this.postingForm.value.title,
      content: this.postingForm.value.content
    };
    this.postingService.create(this.posting).pipe(
      finalize(() => this.loading = false)
    ).subscribe(result => {
      // this.getPostingForm();
      this.posting = result;
      console.log('result', this.posting);
      this.router.navigate(['/posting/' + this.posting.id]);
    });
  }

  private getPostingForm() {
    this.postingForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
