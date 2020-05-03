import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPostingComponent } from './show-posting.component';

describe('ShowPostingComponent', () => {
  let component: ShowPostingComponent;
  let fixture: ComponentFixture<ShowPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
