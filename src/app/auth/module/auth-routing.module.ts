import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'password-reset/:token/edit', component: ResetPasswordComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
