import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      console.log('ErrorInterceptor', err);
      this.alertService.error(err.status + ': ' + err.error.message, true);
      if (err) {
        this.router.navigate(['/login']);
      }
      return throwError(err);
    }));
  }


}
