import {Component, OnDestroy, OnInit} from '@angular/core';
import {GalleryService} from '../../gallery/service/gallery.service';
import {User} from '../../user/model/user';
import {Gallery} from '../../gallery/model/gallery';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  galleries: Gallery[];
  private currentUser: User;
  private subscription: Subscription;

  constructor(
    private galleryService: GalleryService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.subscription = this.galleryService.getGalleriesByUserId(this.currentUser.id).subscribe( resultat => {
      this.galleries = resultat;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
