import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GalleryService} from '../../gallery/service/gallery.service';
import {User} from '../../user/model/user';
import {Gallery} from '../../gallery/model/gallery';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() currentUser: User;
  @Input() postingUser: User | undefined;

  api_org_url = environment.api_org_url;
  galleries: Gallery[];
  private subscription: Subscription;

  constructor(
    private galleryService: GalleryService
  ) { }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getGalleries();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getGalleries(): void {
    if (this.postingUser && this.postingUser.id === this.currentUser.id) {
      this.subscription = this.galleryService.getGalleriesByUserId(this.currentUser.id).subscribe(resultat => {
        this.galleries = resultat;
      });
    } else if (this.postingUser) {
      this.subscription = this.galleryService.getGalleriesByUserId(this.postingUser.id).subscribe(resultat => {
        this.galleries = resultat;
      });
    } else if (this.currentUser) {
      this.subscription = this.galleryService.getGalleriesByUserId(this.currentUser.id).subscribe(resultat => {
        this.galleries = resultat;
      });
    } else if (this.currentUser && !this.postingUser) {
      this.subscription = this.galleryService.getGalleriesByUserId(this.currentUser.id).subscribe(resultat => {
        this.galleries = resultat;
      });
    }
  }
}
