import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostingService} from '../services/posting.service';
import {Posting} from '../model/Posting';
import {Location} from '@angular/common';

@Component({
  selector: 'app-show-posting',
  templateUrl: './show-posting.component.html',
  styleUrls: ['./show-posting.component.css']
})
export class ShowPostingComponent implements OnInit {

  postingId: number;
  posting: Posting;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postingService: PostingService,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.postingId = params['id'];
    });
    this.postingService.getById(this.postingId).subscribe(result => {
      this.posting = result;
    });
  }

  backLink() {
    this.location.back();
  }

}
