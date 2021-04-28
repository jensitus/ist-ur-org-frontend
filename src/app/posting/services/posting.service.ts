import {environment} from '../../../environments/environment';
import {Micropost} from '../model/Micropost';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  apiOrgUrl = environment.api_org_url;

  constructor(
    private http: HttpClient
  ) {
  }

  create(post: Micropost): Observable<Micropost> {
    return this.http.post<Micropost>(`${this.apiOrgUrl}/api/microposts`, post);
  }

  sendPicToPosting(posting_id: string, formData: FormData) {
    return this.http.put(`${this.apiOrgUrl}/api/microposts/${posting_id}/pic`, formData);
  }

  getAllPostings(limit?: number, offset?: number): Observable<any> {
    return this.http.get(`${this.apiOrgUrl}/api/microposts` + '/' + limit + '/' + offset);
  }

  getById(id: string): Observable<Micropost> {
    return this.http.get<Micropost>(`${this.apiOrgUrl}/api/microposts/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiOrgUrl}/api/microposts/${id}`);
  }

  update(posting_id: string, post: Micropost): Observable<Micropost> {
    return this.http.put<Micropost>(`${this.apiOrgUrl}/api/microposts/${posting_id}`, post);
  }

  deletePhoto(postingId: string, photo_id: string): Observable<any> {
    return this.http.delete(`${this.apiOrgUrl}/api/microposts/${postingId}/delete/${photo_id}`);
  }

  getMicropostsByUser(user_id: string): Observable<Micropost[]> {
    return this.http.get<Micropost[]>(`${this.apiOrgUrl}/api/microposts/${user_id}`);
  }

}
