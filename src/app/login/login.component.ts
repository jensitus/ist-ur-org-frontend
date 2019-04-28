import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {

    // here is nothing to do

  }

  onLogin() {
    this.user = {
      username: this.username,
      password: this.password
    };
    this.authService.login(this.user).subscribe(data => {
      this.data = data;
      console.log('data: ', data);
      this.u = {
        username: this.username,
        access_token: this.data.accessToken,
        token_type: this.data.tokeType
      };
      console.log('u', this.u);
      localStorage.setItem('currentUser', JSON.stringify(this.u));
    }, error => {
      console.log(error);
    });
  }

}
