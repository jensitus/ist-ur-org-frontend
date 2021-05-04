import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditUserRoutingModule} from './edit-user-routing.module';
import {EditUserComponent} from './edit-user.component';
import {FormsModule} from '@angular/forms';
import {AppModule} from '../../app.module';
import {UploadComponent} from '../../common/upload/upload.component';



@NgModule({
  declarations: [EditUserComponent, UploadComponent],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    FormsModule
    // AppModule
  ]
})
export class EditUserModule { }
