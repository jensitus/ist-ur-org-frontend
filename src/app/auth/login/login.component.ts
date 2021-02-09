import {AuthService} from '../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorService} from '../../common/services/behavior.service';
import {AlertService} from '../../common/services/alert.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe = false;
  password: string;
  email: string;
  username: string;
  user: any;
  data: any;
  u: any;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private behaviorService: BehaviorService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.authService.logout();
  }

  onLogin() {
    this.loading = true;
    this.user = {
      email: this.email,
      password: this.password
    };
    this.authService.login(this.user).pipe(
      finalize(() => {
        this.behaviorService.setLoginSubject(true);
        this.loading = false;
      })
    ).subscribe(data => {
      this.data = data;
      localStorage.setItem('currentUser', JSON.stringify(this.data.user));
      this.alertService.success('Jesus Christ, you logged in successfully, how did you do that?', true);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }

}
