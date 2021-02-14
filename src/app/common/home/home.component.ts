import { Component, OnInit } from '@angular/core';
import {User} from '../../user/model/user';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostingService} from '../../posting/services/posting.service';
import {Posting} from '../../posting/model/Posting';
import {CommonService} from '../services/common.service';
import {UserService} from '../../user/services/user.service';
import {MessageOrg} from '../model/MessageOrg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  closeResult: string;
  tokenCheck: MessageOrg;

  constructor(
    private modalService: NgbModal,

    private commonService: CommonService,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      // this.userService.checkAuthToken(this.currentUser.access_token).subscribe(data => {
      //   console.log(data);
      //   this.tokenCheck = data;
      //   console.log('tokenCheck', this.tokenCheck);
      // });
    }

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
