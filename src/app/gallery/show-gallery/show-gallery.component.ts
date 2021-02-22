import { Component, OnInit } from '@angular/core';
import {GalleryService} from '../service/gallery.service';
import {Gallery} from '../model/gallery';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-gallery',
  templateUrl: './show-gallery.component.html',
  styleUrls: ['./show-gallery.component.css']
})
export class ShowGalleryComponent implements OnInit {

  gallery: Gallery;
  gallery_id: string;

  constructor(
    private galleryService: GalleryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.gallery_id = params['id'];
    });
  }

  ngOnInit(): void {
    this.galleryService.getGallery(this.gallery_id).subscribe(g => {
      this.gallery = g;
      console.log('g', g);
    });
  }

}
