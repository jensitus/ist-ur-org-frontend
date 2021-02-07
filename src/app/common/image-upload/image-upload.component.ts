import { Component, OnInit } from '@angular/core';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  file: any;
  fileToUpload: File;
  taskId = 'f948bef8-a3bf-4b21-948f-5dc308706712';

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  uploadNow() {
    this.commonService.uploadImage(this.taskId, this.fileToUpload).subscribe(holla => {

    });
  }

  onUpload(files: any) {
    console.log('event.target.files', files);
    this.fileToUpload = files[0];
    const formData = new FormData();
  }
}
