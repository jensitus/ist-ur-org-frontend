import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostingComponent } from './create-posting.component';

describe('CreatePostingComponent', () => {
  let component: CreatePostingComponent;
  let fixture: ComponentFixture<CreatePostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
