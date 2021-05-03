import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditUserComponent} from './edit-user.component';

const routes: Routes = [
  {path: 'user/:id', component: EditUserComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserRoutingModule { }
