import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  token: string;
  email: string;
  loading = false;
  submitted = false;
  expired = false;
  message: string;
  data: any;
  error: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });
    console.log('token: ' + this.token);
    this.email = this.activatedRoute.snapshot.queryParamMap.get('email');
    console.log('email: ' + this.email);

    this.userService.checkTokenExpired(this.token, this.email).subscribe((data) => {
        this.data = data;
        console.log('ALLES PASST');
        console.log(this.data);
      }, (error) => {
        this.error = error;
        console.log('ERROR ZUM DONNER');
        console.log('error', error);
        console.log(error.status);
        if (error.status === 401) {
          this.router.navigate(['/home']);
        } else if (error.status === 422) {
          this.router.navigate(['/home']);
        }
        // this.alertService.error(error, true);
      }
    );

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      email: [this.email, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.resetPassword(this.resetForm.value, this.token, this.email).pipe(first()).subscribe(data => {
        this.data = data;
        console.log('data: ', this.data);
        if (this.data.message) {
        }
        // this.alertService.success('data', true);
        this.router.navigate(['/login']);
      }, error => {
        console.log('error: ' + error.toString());
        // this.alertService.error(error);
      }
    );
  }

  get f() {
    return this.resetForm.controls;
  }

}
