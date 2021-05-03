import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowPostingListComponent } from './show-posting-list.component';

describe('ShowPostingListComponent', () => {
  let component: ShowPostingListComponent;
  let fixture: ComponentFixture<ShowPostingListComponent>;

  beforeEach(waitForAsync(() => {
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
