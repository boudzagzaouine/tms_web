import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenancePlanComponent } from './maintenance-plan.component';

describe('MaintenancePlanComponent', () => {
  let component: MaintenancePlanComponent;
  let fixture: ComponentFixture<MaintenancePlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
