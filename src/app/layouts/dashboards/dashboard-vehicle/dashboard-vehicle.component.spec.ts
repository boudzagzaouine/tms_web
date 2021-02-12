import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehicleComponent } from './dashboard-vehicle.component';

describe('DashboardVehicleComponent', () => {
  let component: DashboardVehicleComponent;
  let fixture: ComponentFixture<DashboardVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
