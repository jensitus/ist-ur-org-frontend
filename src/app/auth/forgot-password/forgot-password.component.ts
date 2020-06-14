import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/services/user.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.forgotPassword(this.forgotForm.value).subscribe(data => {
        console.log(data);
        this.data = data;
        // this.alertService.success(this.data.message, true);
        this.router.navigate(['/login']);
      }, error => {
        console.log('error', error);
        // this.alertService.error(error);
      }
    );
  }

}
