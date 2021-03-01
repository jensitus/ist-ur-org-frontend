import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowingSpinnerComponent } from './growing-spinner.component';

describe('GrowingSpinnerComponent', () => {
  let component: GrowingSpinnerComponent;
  let fixture: ComponentFixture<GrowingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
