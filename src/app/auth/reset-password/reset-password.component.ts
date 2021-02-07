import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AlertService} from '../../common/services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetForm: FormGroup;
  token: string;
  email: string;
  loading = false;
  submitted = false;
  expired = false;
  message: string;
  data: string;
  notifier = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      takeUntil(this.notifier)
    ).subscribe(params => {
      this.token = params['token'];
    });
    this.userService.checkTokenExpired(this.token).pipe(
      takeUntil(this.notifier)
    ).subscribe((data) => {
        this.data = data;
        this.alertService.success(this.data);
      }, (error) => {
        console.log('error', error);
      }
    );

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.resetPassword(this.resetForm.value, this.token).pipe(
      first(),
      takeUntil(this.notifier)
    ).subscribe(data => {
        this.data = data;
        console.log('data: ', this.data);
        this.alertService.success(this.data, true);
        this.router.navigate(['/login']);
      }
    );
  }

  get f() {
    return this.resetForm.controls;
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }



}
