import { Component, OnInit } from '@angular/core';
import {User} from '../../auth/model/user';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostingService} from '../../posting/services/posting.service';
import {Posting} from '../../posting/model/Posting';
import {CommonService} from '../services/common.service';
import {UserService} from '../../auth/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  closeResult: string;
  postings: Posting[];

  constructor(
    private modalService: NgbModal,
    private postingService: PostingService,
    private commonService: CommonService,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      this.userService.checkAuthToken(this.currentUser.accessToken).subscribe(data => {
        this.getAllPostings();
      });
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

  private getAllPostings() {
    this.postingService.getAllPostings().subscribe(result => {
      this.postings = result;
    });
  }

}
