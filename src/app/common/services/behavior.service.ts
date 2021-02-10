import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  constructor() { }

  public loginSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public commentSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public postingSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public uploadSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  setLoginSubject(value) {
    if (value) {
      this.loginSubject.next(value);
    } else {
      this.loginSubject.next(null);
    }
  }

  setCommentSubject(value) {
    if (value) {
      this.commentSubject.next(value);
    } else {
      this.commentSubject.next(null);
    }
  }

  setPostingSubject(value) {
    if (value) {
      this.postingSubject.next(value);
    } else {
      this.postingSubject.next(null);
    }
  }

  setUploadSubject(value) {
    if (value) {
      this.uploadSubject.next(value);
    } else {
      this.uploadSubject.next(null);
    }
  }

}
