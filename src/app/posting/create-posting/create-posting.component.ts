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
  fileUpload: File;

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
    const formData = new FormData();
    if (this.fileUpload) {
      formData.append('photo', this.fileUpload);
    }
    this.loading = true;
    this.posting = {
      title: this.postingForm.value.title,
      content: this.postingForm.value.content
    };
    this.postingService.create(this.posting).pipe(
      finalize(() => {
        this.loading = false;
        this.sendTheFuckingPicToThePosting(formData);
      })
    ).subscribe(result => {
      // this.getPostingForm();
      this.posting = result;
      this.router.navigate(['/posting/' + this.posting.id]);
    });
  }

  onFileChange(files: FileList): void {
    this.fileUpload = files[0];
    console.log('this.fileUpload', this.fileUpload);
  }

  private sendTheFuckingPicToThePosting(formData: FormData) {
    console.log('send the Pic', formData);
    this.postingService.sendPicToPosting(this.posting.id, formData).subscribe(donner => {
      console.log('the donner result:', donner);
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
