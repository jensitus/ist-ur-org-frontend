import { environment } from '../../environments/environment';
import { Micropost } from '../model/micropost';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  createMicropost(post: Micropost): Observable<Micropost> {
    return this.http.post<Micropost>(`${this.apiUrl}/posts`, post);
  }

  deleteMicropost(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }

  updateMicropost(post: Micropost): Observable<Micropost> {
    return this.http.put<Micropost>(`${this.apiUrl}/posts/${post.id}`, post);
  }
}
