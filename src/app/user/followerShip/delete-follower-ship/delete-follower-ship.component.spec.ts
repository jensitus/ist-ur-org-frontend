import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteFollowerShipComponent } from './delete-follower-ship.component';

describe('DeleteFollowerShipComponent', () => {
  let component: DeleteFollowerShipComponent;
  let fixture: ComponentFixture<DeleteFollowerShipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFollowerShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFollowerShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
