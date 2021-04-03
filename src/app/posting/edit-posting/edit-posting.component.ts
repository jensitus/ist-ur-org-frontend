import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PostingService} from '../services/posting.service';
import {finalize, switchMap, takeUntil} from 'rxjs/operators';
import {Micropost} from '../model/Micropost';

@Component({
  selector: 'app-edit-posting',
  templateUrl: './edit-posting.component.html',
  styleUrls: ['./edit-posting.component.css']
})
export class EditPostingComponent implements OnInit, OnDestroy {

  updateForm: FormGroup;
  private subscriptions: Subscription[] = [];
  posting: Micropost;
  loading = false;
  filesUpload: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private postingService: PostingService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadPostingForEdit();
  }

  loadPostingForEdit() {
    this.loading = true;
    this.subscriptions.push(this.activatedRoute.params.pipe(
      switchMap((params) => this.postingService.getById(params.id))
      ).subscribe(post => {
        this.posting = post;
        console.log('this.posting', this.posting);
        this.setUpdateForm();
        this.loading = false;
      })
    );
  }

  getUpdateForm() {
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  setUpdateForm() {
    this.getUpdateForm();
    const postingValues = {
      title: this.posting.title,
      content: this.posting.content
    };
    this.updateForm.setValue(postingValues);
  }

  onPostingEdit() {
    this.loading = true;
    if (this.filesUpload) {
      this.sendPicToPosting();
    }
    this.subscriptions.push(this.postingService.update(this.posting.id, this.updateForm.value).pipe(
      finalize(() => {
        this.router.navigate(['/posting', this.posting.id]);
        this.loading = false;
      })
    ).subscribe(() => {
    }));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      for (const s of this.subscriptions) {
        s.unsubscribe();
      }
    }
  }

  delete(photo_id: string) {
    this.loading = true;
    this.subscriptions.push(this.postingService.deletePhoto(this.posting.id, photo_id).pipe(
      finalize(() => {
        this.loadPostingForEdit();
        this.loading = false;
      })
    ).subscribe( r => {
        console.log('r r r r r r', r);
      }
    ));
  }

  onFileChange(files: any) {
    this.filesUpload.push(files[0]);
    console.log('this.fileUpload', this.filesUpload);
  }

  sendPicToPosting() {
    for (const p of this.filesUpload) {
      const formData = new FormData();
      formData.append('image', p);
      console.log(this.filesUpload);
      console.log(p);
      console.log('formData', formData);
      this.subscriptions.push(this.postingService.sendPicToPosting(this.posting.id, formData).subscribe(res => {
        console.log(res);
      }));
    }
  }

}
