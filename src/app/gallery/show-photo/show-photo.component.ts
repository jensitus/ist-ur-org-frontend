import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-photo',
  templateUrl: './show-photo.component.html',
  styleUrls: ['./show-photo.component.css']
})
export class ShowPhotoComponent implements OnInit {

  @Input() photoUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
