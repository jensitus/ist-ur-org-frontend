import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';

@Injectable()
export class CanReadGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // return this.auth.user$.pipe(
    //   take(1),
    //   map(user => user && this.auth.canRead(user) ? true : false),
    //   tap(canRead => {
    //     if (!canRead) {
    //       console.error('Access denied - no read access');
    //     }
    //   })
    // );
    // return null;
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
