import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCommissionEditComponent } from './driver-commission-edit.component';

describe('DriverCommissionEditComponent', () => {
  let component: DriverCommissionEditComponent;
  let fixture: ComponentFixture<DriverCommissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverCommissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverCommissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
