import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPostingListComponent } from './show-posting-list.component';

describe('ShowPostingListComponent', () => {
  let component: ShowPostingListComponent;
  let fixture: ComponentFixture<ShowPostingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPostingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPostingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
