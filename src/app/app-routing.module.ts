import {HomeComponent} from './common/home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {ShowPostingComponent} from './micropost/show-posting/show-posting.component';
import {ShowUserComponent} from './user/show-user/show-user.component';
import {ImageUploadComponent} from './common/image-upload/image-upload.component';
import {ShowGalleryComponent} from './gallery/show-gallery/show-gallery.component';
import {EditGalleryComponent} from './gallery/edit-gallery/edit-gallery.component';
import {EditPostingComponent} from './micropost/edit-posting/edit-posting.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/module/auth.module').then((a) => a.AuthModule)},
  {path: 'edit-user', loadChildren: () => import('./user/edit-user/edit-user.module').then((e) => e.EditUserModule)},
  {path: 'login', component: LoginComponent},
  {path: 'micropost/:id', component: ShowPostingComponent},
  {path: 'micropost/:id/edit', component: EditPostingComponent},
  {path: 'user/:id', component: ShowUserComponent},
  {path: 'upload-image', component: ImageUploadComponent},
  {path: 'gallery/:id', component: ShowGalleryComponent},
  {path: 'gallery/:id/edit', component: EditGalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
