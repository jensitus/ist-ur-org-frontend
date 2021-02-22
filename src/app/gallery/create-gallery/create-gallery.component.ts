import { Component, OnInit } from '@angular/core';
import {GalleryService} from '../service/gallery.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Gallery} from '../model/gallery';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/model/user';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-gallery',
  templateUrl: './create-gallery.component.html',
  styleUrls: ['./create-gallery.component.css']
})
export class CreateGalleryComponent implements OnInit {

  galleryForm: FormGroup;
  filesUpload: File[] = [];
  submitted = false;
  loading = false;
  gallery: Gallery;
  currentUser: User;

  constructor(
    private galleryService: GalleryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.galleryForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', '']
    });
  }

  onFileChange(files: FileList): void {
    this.filesUpload.push(files[0]);
    console.log('this.fileUpload', this.filesUpload);
  }

  createGallery(): void {
    this.loading = true;
    console.log(this.galleryForm);
    this.gallery = {
      title: this.galleryForm.value.title,
      description: this.galleryForm.value.description,
      user_id: this.currentUser.id
    };
    this.galleryService.create(this.gallery).pipe(
      finalize(() => {
        this.sendTheFuckingPicToTheGallery();
        this.loading = false;
        this.router.navigate(['/gallery/', this.gallery.id]);
      })
    ).subscribe(result => {
      this.gallery = result;
    });
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  private sendTheFuckingPicToTheGallery() {
    for (const file of this.filesUpload) {
      const formData = new FormData();
      formData.append('photo', file);
      this.galleryService.sendPicToGallery(this.gallery.id, formData).pipe().subscribe(res => {
        console.log(res);
      });
    }
  }

}
