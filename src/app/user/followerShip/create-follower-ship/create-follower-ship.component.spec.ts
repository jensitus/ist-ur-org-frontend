import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFollowerShipComponent } from './create-follower-ship.component';

describe('CreateFollowerShipComponent', () => {
  let component: CreateFollowerShipComponent;
  let fixture: ComponentFixture<CreateFollowerShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFollowerShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFollowerShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
