import {environment} from '../../../environments/environment';
import {Posting} from '../model/Posting';
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

  create(post: Posting): Observable<Posting> {
    return this.http.post<Posting>(`${this.apiOrgUrl}/postings`, post);
  }

  sendPicToPosting(posting_id: string, formData: FormData) {
    return this.http.put(`${this.apiOrgUrl}/api/postings/${posting_id}/pic`, formData);
  }

  getAllPostings(): Observable<Posting[]> {
    return this.http.get<Posting[]>(`${this.apiOrgUrl}/postings`);
  }

  getById(id: string): Observable<Posting> {
    return this.http.get<Posting>(`${this.apiOrgUrl}/postings/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiOrgUrl}/postings/${id}`);
  }

  update(post: Posting): Observable<Posting> {
    return this.http.put<Posting>(`${this.apiOrgUrl}/postings/${post.id}`, post);
  }
}
