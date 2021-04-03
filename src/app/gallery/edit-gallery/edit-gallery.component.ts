import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Gallery} from '../model/gallery';
import {finalize, switchMap, takeUntil} from 'rxjs/operators';
import {GalleryService} from '../service/gallery.service';
import {Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.css']
})
export class EditGalleryComponent implements OnInit, OnDestroy {

  gallery: Gallery;
  private destroy$ = new Subject();
  updateForm: FormGroup;
  title: string;
  description: string;
  public loading = false;
  filesUpload: File[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private galleryService: GalleryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getGalleryPhotos();
  }

  getGalleryPhotos() {
    this.activatedRoute.params.pipe(
      switchMap((params) => this.galleryService.getGallery(params.id)),
      takeUntil(this.destroy$)
    ).subscribe((gallery) => {
      this.gallery = gallery;
      this.setTheUpdateForm();
    });
  }

  setTheUpdateForm() {
    this.getTheUpdateForm();
    const galleryValues = {
      title: this.gallery.title,
      description: this.gallery.description
    };
    this.updateForm.setValue(galleryValues);
  }

  onGallerySubmit() {
    if (this.filesUpload) {
      this.sendPicToGallery();
    }
    if (this.gallery.title !== this.updateForm.value.title || this.gallery.description !== this.updateForm.value.description) {
      console.log('zack zement', true);
    }

    this.galleryService.updateGallery(this.gallery.id, this.updateForm.value).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.loading = false;
        this.router.navigate(['/gallery/', this.gallery.id]);
      })
    ).subscribe(result => {
      this.gallery = result;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getTheUpdateForm() {
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.minLength(10)]
    });
  }

  delete(photo_id: string) {
    this.loading = true;
    this.galleryService.deletePhoto(this.gallery.id, photo_id).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.getGalleryPhotos();
        this.loading = false;
      })
    ).subscribe(r => {
      console.log('r', r);
    });
  }

  sendPicToGallery() {
    if (this.filesUpload) {
      for (const p of this.filesUpload) {
        const formData = new FormData();
        formData.append('image', p);
        console.log('formData', formData);
        this.galleryService.sendPicToGallery(this.gallery.id, formData).pipe(
          takeUntil(this.destroy$)
        ).subscribe(res => {
          console.log(res);
        });
      }
    }
  }

  onFileChange(files: FileList): void {
    this.filesUpload.push(files[0]);
    console.log('this.fileUpload', this.filesUpload);
  }

}
