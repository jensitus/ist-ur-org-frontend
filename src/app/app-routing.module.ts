import { HomeComponent } from './common/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ShowPostingComponent} from './posting/show-posting/show-posting.component';
import {ShowUserComponent} from './user/show-user/show-user.component';
import {ImageUploadComponent} from './common/image-upload/image-upload.component';
import {ShowGalleryComponent} from './gallery/show-gallery/show-gallery.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'password-reset/:token/edit', component: ResetPasswordComponent},
  {path: 'posting/:id', component: ShowPostingComponent},
  {path: 'user/:id', component: ShowUserComponent},
  {path: 'upload-image', component: ImageUploadComponent},
  {path: 'gallery/:id', component: ShowGalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
