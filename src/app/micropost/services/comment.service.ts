import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CreateCommentDto} from '../model/create-comment-dto';
import {Observable} from 'rxjs';
import {Comment} from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiOrgUrl = environment.api_org_url;

  constructor(
    private http: HttpClient
  ) {
  }

  create(comment: CreateCommentDto): Observable<Comment> {
    return this.http.post<Comment>(this.apiOrgUrl + '/api/microposts/' + comment.micropost_id + '/comments/', comment);
  }

  getByPostingId(micropostId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiOrgUrl + '/api/microposts/' + micropostId + '/comments/');
  }

}
