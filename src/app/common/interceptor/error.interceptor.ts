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
      console.log('ErrorInterceptor', err.status);
      if (err.status === 200) {
        console.log('yeah, 200');
        return;
      } else if (err.status === 500) {
        this.alertService.error(err.status + ': internal Server Error', true);
        // } else if (err.error.message) {
        //   this.alertService.error(err.status + ': ' + err.error.message, true);
      } else if (err.status === 404) {
        if (err.error.message === 'Couldn\'t find Micropost without an ID') {
          this.alertService.success('cool', false);
        } else {
          this.alertService.error(err.status + ': ' + err.error.message, true);
        }
      } else if (err.status === 422) {
        this.alertService.error(err.status + ': ' + err.error.message, true);
        this.router.navigate(['/login']).then(r => {
        });
      } else if (err) {
        this.alertService.error(err.status + ': ' + err.error, true);
        this.router.navigate(['/login']).then(r => {
        });
      }
      return throwError(err);
    }));
  }


}
