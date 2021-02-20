import {HomeComponent} from './common/home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {ShowPostingComponent} from './posting/show-posting/show-posting.component';
import {ShowUserComponent} from './user/show-user/show-user.component';
import {ImageUploadComponent} from './common/image-upload/image-upload.component';
import {ShowGalleryComponent} from './gallery/show-gallery/show-gallery.component';
import {EditGalleryComponent} from './gallery/edit-gallery/edit-gallery.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/module/auth.module').then((a) => a.AuthModule)},
  {path: 'login', component: LoginComponent},
  {path: 'posting/:id', component: ShowPostingComponent},
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
