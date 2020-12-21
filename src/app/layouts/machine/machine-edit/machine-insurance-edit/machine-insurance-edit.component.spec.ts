import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MachineInsuranceEditComponent } from './machine-insurance-edit.component';

describe('MachineInsuranceEditComponent', () => {
  let component: MachineInsuranceEditComponent;
  let fixture: ComponentFixture<MachineInsuranceEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineInsuranceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineInsuranceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
