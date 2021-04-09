import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostingService} from '../../posting/services/posting.service';
import {Subscription} from 'rxjs';
import {PhotoDto} from '../model/photo-dto';
import {finalize, takeUntil} from 'rxjs/operators';
import {BehaviorService} from '../services/behavior.service';
import {GalleryService} from '../../gallery/service/gallery.service';

@Component({
  selector: 'app-add-and-remove-photo',
  templateUrl: './add-and-remove-photo.component.html',
  styleUrls: ['./add-and-remove-photo.component.css']
})
export class AddAndRemovePhotoComponent implements OnInit, OnDestroy {

  @Input() private type: string;
  @Input() private entityId: string;
  @Input() public photos: PhotoDto[];

  filesUpload: File[] = [];
  private subscriptions: Subscription[] = [];
  loading = false;

  constructor(
    private postingService: PostingService,
    private behaviorService: BehaviorService,
    private galleryService: GalleryService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      for (const s of this.subscriptions) {
        s.unsubscribe();
      }
    }
  }

  onFileChange(files: any) {
    this.filesUpload.push(files[0]);
  }

  sendPicToPosting() {
    for (const p of this.filesUpload) {
      const formData = new FormData();
      formData.append('image', p);
      if (this.type === 'micropost') {
        this.subscriptions.push(this.postingService.sendPicToPosting(this.entityId, formData).pipe(
          finalize(() => {
            this.behaviorService.setPhotoSubject(true);
          })
        ).subscribe(res => {
          console.log(res);
        }));
      } else if (this.type === 'gallery') {
        this.subscriptions.push(this.galleryService.sendPicToGallery(this.entityId, formData).pipe(
          finalize(() => {
            this.behaviorService.setPhotoSubject(true);
          })
        ).subscribe(res => {
          console.log(res);
        }));
      }
    }
  }

  delete(photo_id: string) {
    this.loading = true;
    if (this.type === 'micropost') {
      this.subscriptions.push(this.postingService.deletePhoto(this.entityId, photo_id).pipe(
        finalize(() => {
          this.behaviorService.setPhotoSubject(true);
          this.loading = false;
        })
      ).subscribe(r => {
          console.log('r r r r r r', r);
        }
      ));
    } else if (this.type === 'gallery') {
      this.subscriptions.push(this.galleryService.deletePhoto(this.entityId, photo_id).pipe(
        finalize(() => {
          this.behaviorService.setPhotoSubject(true);
          this.loading = false;
        })
      ).subscribe(r => {
        console.log(r);
      }));
    }
  }

}
