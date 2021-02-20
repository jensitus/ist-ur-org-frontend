import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostingComponent } from './edit-posting.component';

describe('EditPostingComponent', () => {
  let component: EditPostingComponent;
  let fixture: ComponentFixture<EditPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
