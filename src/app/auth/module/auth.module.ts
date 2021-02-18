import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {RegisterComponent} from '../register/register.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {AuthRoutingModule} from './auth-routing.module';



@NgModule({
  declarations: [
    ForgotPasswordComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
