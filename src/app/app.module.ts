import { PostingService } from './posting/services/posting.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService} from './auth/services/user.service';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { JwtInterceptor} from './auth/helper/jwt.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './auth/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CreatePostingComponent } from './posting/create-posting/create-posting.component';
import { ShowPostingComponent } from './posting/show-posting/show-posting.component';
import { CreateCommentComponent } from './posting/create-comment/create-comment.component';
import { CommentListComponent } from './posting/comment-list/comment-list.component';
import {ErrorInterceptor} from './common/helper/error.interceptor';
import {AppCommonModule} from './common/app-common/app-common.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CreatePostingComponent,
    ShowPostingComponent,
    CreateCommentComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    PostingService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
