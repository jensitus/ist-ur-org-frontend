import {Component, OnDestroy, OnInit} from '@angular/core';
import {GalleryService} from '../service/gallery.service';
import {Gallery} from '../model/gallery';
import {ActivatedRoute} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-gallery',
  templateUrl: './show-gallery.component.html',
  styleUrls: ['./show-gallery.component.css']
})
export class ShowGalleryComponent implements OnInit, OnDestroy {

  gallery: Gallery;
  gallery_id: string;
  closeResult = '';

  constructor(
    private galleryService: GalleryService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
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

  ngOnDestroy(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
