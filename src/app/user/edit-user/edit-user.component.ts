import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {PostingService} from '../../micropost/services/posting.service';
import {switchMap} from 'rxjs/operators';
import {Micropost} from '../../micropost/model/Micropost';
import {User} from '../model/user';
import {UserService} from '../services/user.service';
import {UploadType} from '../../common/upload-type.enum';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  avatar = UploadType.AVATAR;
  private subscriptions: Subscription[] = [];
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.pipe(switchMap((params) =>
      this.userService.getUserById(params.id))).subscribe(user => {
        this.user = user;
    }));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      for (const s of this.subscriptions) {
        s.unsubscribe();
      }
    }
  }

  onSubmit(editForm) {
    console.log(editForm.value);
    console.log(this.user);
    console.log(this.subscriptions);
    this.subscriptions.push(this.userService.updateUser(this.user).subscribe(updatedUser => {
      console.log(updatedUser);
    }))
  }



}
