import {Component, Input, OnInit} from '@angular/core';
import {Micropost} from '../model/Micropost';
import {User} from '../../user/model/user';

@Component({
  selector: 'app-single-micropost',
  templateUrl: './single-micropost.component.html',
  styleUrls: ['./single-micropost.component.css']
})
export class SingleMicropostComponent implements OnInit {

  @Input() micropost: Micropost;
  @Input() postingUser: User;
  @Input() currentUser: User;
  @Input() micropost_user_id: string;
  @Input() micropost_user_name: string;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log('micropost_user: ', this.micropost_user_id, this.micropost_user_name);
    }, 500);
  }

}
