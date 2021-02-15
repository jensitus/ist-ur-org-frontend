import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  private first: string;

  @Input()
  private second: string;

  @Input()
  private third: string;

  constructor() { }

  ngOnInit(): void {
  }



}
