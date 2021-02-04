import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {

  avatarForm: FormGroup;
  file: any;
  userId: string;
  fileToUpload: File;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
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
    console.log('event.target.files', files);
    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: 'aber hallo'});
    // for (this.file of event.files) {
    this.fileToUpload = files[0];
      console.log(this.userId);
      // console.log('av_form_value:', this.avatarForm.value);
      const formData = new FormData();
      // formData.append('avatar', this.avatarForm.get('fileSource').value);
      // console.log('formData', formData);

   // }
  }

  uploadNow() {
    this.userService.uploadAvatar(this.userId, this.fileToUpload).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
