import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  login: string;
  email: string;
  password: string;
  passwordRepeat: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onRegister(): void{
    this.userService.register(this.login, this.password, this.email);
  }

}
