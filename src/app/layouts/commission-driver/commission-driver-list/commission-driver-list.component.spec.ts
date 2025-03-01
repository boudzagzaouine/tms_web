import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommissionDriverListComponent } from './commission-driver-list.component';

describe('CommissionDriverListComponent', () => {
  let component: CommissionDriverListComponent;
  let fixture: ComponentFixture<CommissionDriverListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionDriverListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionDriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
