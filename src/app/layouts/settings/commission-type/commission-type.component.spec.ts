import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommissionTypeComponent } from './commission-type.component';

describe('CommissionTypeComponent', () => {
  let component: CommissionTypeComponent;
  let fixture: ComponentFixture<CommissionTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
