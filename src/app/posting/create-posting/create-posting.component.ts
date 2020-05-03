import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Posting} from '../model/Posting';
import {PostingService} from '../services/posting.service';

@Component({
  selector: 'app-create-posting',
  templateUrl: './create-posting.component.html',
  styleUrls: ['./create-posting.component.css']
})
export class CreatePostingComponent implements OnInit {

  postingForm: FormGroup;
  loading = false;
  submitted = false;
  posting: Posting;
  postings: any;

  constructor(
    private formBuilder: FormBuilder,
    private postingService: PostingService
  ) {
  }

  ngOnInit() {
    this.getPostinForm();
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
    console.log(this.postingForm.value);
    this.posting = {
      id: null,
      content: this.postingForm.value.content,
      userId: null,
      picture: null,
      createdAt: null,
      updatedAt: null
    };
    this.postingService.create(this.posting).subscribe(result => {
      this.getPostinForm();
      this.loading = false;
    });
  }

  private getPostinForm() {
    this.postingForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }



}
