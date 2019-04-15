import {UserService} from './../services/user.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  registerForm: FormGroup;
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.registerForm);
    this.userService.register(this.registerForm.value).pipe(first()).subscribe(data => {
        console.log(data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

}
