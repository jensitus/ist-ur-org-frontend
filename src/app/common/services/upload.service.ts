import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  apiOrgUrl = environment.api_org_url;

  constructor(private http: HttpClient) { }

  uploadAvatar(userId: string, file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    console.log('formData', formData);
    return this.http.post(`${this.apiOrgUrl}/api/users/${userId}/avatar`, formData);
  }

  uploadPhoto(gallery_id: string, file: File) {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http.put(`${this.apiOrgUrl}/api/gallery/${gallery_id}/update`, formData);
  }

}
