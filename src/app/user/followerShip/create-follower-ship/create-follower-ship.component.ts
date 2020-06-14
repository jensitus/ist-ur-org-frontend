import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {FollowerShip} from '../../model/follower-ship';
import {MessageOrg} from '../../../common/model/MessageOrg';
import {ifTrue} from 'codelyzer/util/function';

@Component({
  selector: 'app-create-follower-ship',
  templateUrl: './create-follower-ship.component.html',
  styleUrls: ['./create-follower-ship.component.css']
})
export class CreateFollowerShipComponent implements OnInit {

  @Input() followed_id: number;
  @Input() follower_id: number;
  loading = false;
  submitted = false;
  currentUser: User;
  following = false;
  fs: FollowerShip;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.checkIfOneIsFollowingTheOther(this.follower_id, this.followed_id).subscribe( result => {
      this.fs = result;
      console.log(this.fs);
      if (this.fs != null) {
        this.following = true;
      }
    });
  }

  followThis() {
    this.loading = true;
    this.userService.followThisUser(this.follower_id, this.followed_id).subscribe(sowas => {
      this.fs = sowas;
      this.following = true;
      this.loading = false;
    });
  }

  unFollowThis() {
    this.loading = true;
    this.userService.unFollowThisUser(this.fs.id).subscribe(donner => {
      this.following = false;
      this.loading = false;
    });
  }

}
