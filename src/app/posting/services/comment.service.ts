import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CreateCommentDto} from '../model/create-comment-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiUrl = environment.api_url;

  constructor(
    private http: HttpClient
  ) {
  }

  create(comment: CreateCommentDto): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl + '/api/comments/create', comment);
  }

  getByPostingId(postingId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl + '/api/comments/get/' + postingId);
  }

}
