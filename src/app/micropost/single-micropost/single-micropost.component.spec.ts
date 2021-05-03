import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMicropostComponent } from './single-micropost.component';

describe('SingleMicropostComponent', () => {
  let component: SingleMicropostComponent;
  let fixture: ComponentFixture<SingleMicropostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMicropostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMicropostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
