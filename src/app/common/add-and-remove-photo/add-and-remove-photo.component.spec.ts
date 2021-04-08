import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndRemovePhotoComponent } from './add-and-remove-photo.component';

describe('AddAndRemovePhotoComponent', () => {
  let component: AddAndRemovePhotoComponent;
  let fixture: ComponentFixture<AddAndRemovePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAndRemovePhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAndRemovePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
