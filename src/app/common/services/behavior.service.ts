import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  constructor() { }

  public loginSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  setLoginSubject(value) {
    if (value) {
      this.loginSubject.next(value);
    } else {
      this.loginSubject.next(null);
    }
  }

}
