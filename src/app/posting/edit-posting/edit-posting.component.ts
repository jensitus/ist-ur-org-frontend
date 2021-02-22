import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PostingService} from '../services/posting.service';
import {finalize, switchMap} from 'rxjs/operators';
import {Posting} from '../model/Posting';

@Component({
  selector: 'app-edit-posting',
  templateUrl: './edit-posting.component.html',
  styleUrls: ['./edit-posting.component.css']
})
export class EditPostingComponent implements OnInit, OnDestroy {

  updateForm: FormGroup;
  private subscriptions: Subscription[] = [];
  posting: Posting;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private postingService: PostingService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.pipe(
      switchMap((params) => this.postingService.getById(params.id))
      ).subscribe(post => {
        this.posting = post;
        this.setUpdateForm();
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
    this.subscriptions.push(this.postingService.update(this.posting.id, this.updateForm.value).pipe(
      finalize(() => {
        this.router.navigate(['/posting', this.posting.id]);
      })
    ).subscribe(() => {}));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      for (const s of this.subscriptions) {
        s.unsubscribe();
      }
    }
  }

}
