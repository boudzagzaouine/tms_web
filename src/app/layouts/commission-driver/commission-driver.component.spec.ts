import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommissionDriverComponent } from './commission-driver.component';

describe('CommissionDriverComponent', () => {
  let component: CommissionDriverComponent;
  let fixture: ComponentFixture<CommissionDriverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
