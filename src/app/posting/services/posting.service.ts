import {environment} from '../../../environments/environment';
import {Posting} from '../model/Posting';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) {
  }

  create(post: Posting): Observable<Posting> {
    return this.http.post<Posting>(`${this.apiUrl}/api/postings/create/`, post);
  }

  getAllPostings(): Observable<Posting[]> {
    return this.http.get<Posting[]>(`${this.apiUrl}/api/postings/all/`);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/api/postings/get/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }

  update(post: Posting): Observable<Posting> {
    return this.http.put<Posting>(`${this.apiUrl}/posts/${post.id}`, post);
  }
}
