import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAvailabilityListComponent } from './vehicle-availability-list.component';

describe('VehicleAvailabilityListComponent', () => {
  let component: VehicleAvailabilityListComponent;
  let fixture: ComponentFixture<VehicleAvailabilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAvailabilityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
