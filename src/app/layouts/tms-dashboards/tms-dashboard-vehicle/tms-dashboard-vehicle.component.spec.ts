import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsDashboardVehicleComponent } from './tms-dashboard-vehicle.component';

describe('TmsDashboardVehicleComponent', () => {
  let component: TmsDashboardVehicleComponent;
  let fixture: ComponentFixture<TmsDashboardVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmsDashboardVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsDashboardVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
