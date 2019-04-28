import { environment } from './../../environments/environment';
import { Micropost } from './../model/micropost';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  create(post: Micropost): Observable<Micropost> {
    return this.http.post<Micropost>(`${this.apiUrl}/posts`, post);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }

  update(post: Micropost): Observable<Micropost> {
    return this.http.put<Micropost>(`${this.apiUrl}/posts/${post.id}`, post);
  }
}
