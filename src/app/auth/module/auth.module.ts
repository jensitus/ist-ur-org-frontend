import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {RegisterComponent} from '../register/register.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ForgotPasswordComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
