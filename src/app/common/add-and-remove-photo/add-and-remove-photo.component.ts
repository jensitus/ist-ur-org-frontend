import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostingService} from '../../posting/services/posting.service';
import {Subscription} from 'rxjs';
import {PhotoDto} from '../model/photo-dto';
import {finalize} from 'rxjs/operators';
import {BehaviorService} from '../services/behavior.service';

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
    private behaviorService: BehaviorService
  ) { }

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
    console.log('this.fileUpload', this.filesUpload);
  }

  sendPicToPosting() {
    for (const p of this.filesUpload) {
      const formData = new FormData();
      formData.append('image', p);
      console.log(this.filesUpload);
      console.log(p);
      console.log('formData', formData);
      this.subscriptions.push(this.postingService.sendPicToPosting(this.entityId, formData).pipe(
        finalize(() => {
          this.behaviorService.setPhotoSubject(true);
        })
      ).subscribe(res => {
        console.log(res);
      }));
    }
  }

  delete(photo_id: string) {
    this.loading = true;
    this.subscriptions.push(this.postingService.deletePhoto(this.entityId, photo_id).pipe(
      finalize(() => {
        this.behaviorService.setPhotoSubject(true);
        this.loading = false;
      })
    ).subscribe( r => {
        console.log('r r r r r r', r);
      }
    ));
  }

}
