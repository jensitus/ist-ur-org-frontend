import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../user/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {UploadType} from '../upload-type.enum';
import {CommonService} from '../services/common.service';
import {BehaviorService} from '../services/behavior.service';
import {UploadService} from '../services/upload.service';
import {User} from '../../user/model/user';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() private uploadType: string;
  @Input() currentUser: User;

  avatarForm: FormGroup;
  file: any;
  userId: string;
  fileToUpload: File;
  private newCurrentUser;

  private unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private behaviorService: BehaviorService,
    private uploadService: UploadService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.userId = params['id'];
    });
    this.getAvatarFormGroup();
  }

  onFileChange(event) {
    console.log(event);
  }

  private getAvatarFormGroup() {
    this.avatarForm = this.formBuilder.group({
      fileSource: [Validators.required]
    });
  }

  onUpload(files: FileList) {
    this.fileToUpload = files[0];
  }

  uploadNow() {
    if (this.uploadType === UploadType.AVATAR) {
      this.uploadService.uploadAvatar(this.userId, this.fileToUpload).pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.behaviorService.setUploadSubject(true);
        })
      ).subscribe(data => {
        console.log('data', data);
        this.newCurrentUser = {
          id: data.id,
          name: data.name,
          access_token: this.currentUser.access_token,
          email: data.email,
          avatar: data.avatar
        };
        localStorage.setItem('currentUser', JSON.stringify(this.newCurrentUser));
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

}
