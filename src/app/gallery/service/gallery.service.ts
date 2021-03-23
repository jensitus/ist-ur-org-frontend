import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Gallery} from '../model/gallery';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  apiOrgUrl = environment.api_org_url;

  constructor(
    private http: HttpClient
  ) { }

  create(gallery: Gallery): Observable<Gallery> {
    return this.http.post<Gallery>(`${this.apiOrgUrl}/api/gallery/create`, gallery);
  }

  sendPicToGallery(gallery_id: string, formData: FormData) {
    return this.http.put(`${this.apiOrgUrl}/api/gallery/${gallery_id}/pic`, formData);
  }

  getGallery(gallery_id: string): Observable<Gallery> {
    return this.http.get<Gallery>(`${this.apiOrgUrl}/api/gallery/${gallery_id}/show`);
  }

  getGalleriesByUserId(user_id: string): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.apiOrgUrl}/api/gallery/${user_id}/index`);
  }

  updateGallery(gallery_id: string, gallery: Gallery): Observable<Gallery> {
    return this.http.put<Gallery>(`${this.apiOrgUrl}/api/gallery/${gallery_id}/update`, gallery);
  }

  deletePhoto(gallery_id: string, attachment_id: string): Observable<any> {
    return this.http.delete(`${this.apiOrgUrl}/api/gallery/${gallery_id}/delete/${attachment_id}`);
  }

}
