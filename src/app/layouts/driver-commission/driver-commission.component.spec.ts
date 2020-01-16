import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCommissionComponent } from './driver-commission.component';

describe('DriverCommissionComponent', () => {
  let component: DriverCommissionComponent;
  let fixture: ComponentFixture<DriverCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
