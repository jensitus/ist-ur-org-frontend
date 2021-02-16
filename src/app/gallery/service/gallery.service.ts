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

}
