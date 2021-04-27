import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GalleryService} from '../../gallery/service/gallery.service';
import {User} from '../../user/model/user';
import {Gallery} from '../../gallery/model/gallery';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() postingUser: User;

  galleries: Gallery[];
  currentUser: User;
  notifier$ = new Subject();

  constructor(
    private galleryService: GalleryService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setTimeout(() => {
      this.getGalleries();
    }, 500);
  }

  getGalleries() {
    if (this.postingUser) {
      console.log(this.postingUser);
      this.galleryService.getGalleriesByUserId(this.postingUser.id).pipe(takeUntil(this.notifier$)).subscribe(resultat => {
        this.galleries = resultat;
      });
    } else if (this.currentUser) {
      this.galleryService.getGalleriesByUserId(this.currentUser.id).pipe(takeUntil(this.notifier$)).subscribe(resultat => {
        this.galleries = resultat;
      });
    }
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

}
