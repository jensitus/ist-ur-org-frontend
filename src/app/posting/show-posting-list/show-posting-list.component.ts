import { Component, OnInit } from '@angular/core';
import {Posting} from '../model/Posting';
import {PostingService} from '../services/posting.service';

@Component({
  selector: 'app-show-posting-list',
  templateUrl: './show-posting-list.component.html',
  styleUrls: ['./show-posting-list.component.css']
})
export class ShowPostingListComponent implements OnInit {

  postings: Posting[];

  constructor(
    private postingService: PostingService,
  ) { }

  ngOnInit(): void {
    this.getPostingList();
  }

  private getPostingList() {
    this.postingService.getAllPostings().subscribe(result => {
      this.postings = result;
    });
  }

}
