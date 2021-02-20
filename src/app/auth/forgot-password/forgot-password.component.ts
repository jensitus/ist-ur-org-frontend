import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/services/user.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AlertService} from '../../common/services/alert.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  data: any;
  subscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthService
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
    this.subscription = this.authService.forgotPassword(this.forgotForm.value).subscribe(data => {
        console.log(data);
        this.data = data;
        this.alertService.success(this.data, true);
        this.router.navigate(['/login']);
      }, error => {
        console.log('error', error);
        // this.alertService.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
