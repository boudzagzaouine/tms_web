import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAvailablityComponent } from './vehicle-availablity.component';

describe('VehicleAvailablityComponent', () => {
  let component: VehicleAvailablityComponent;
  let fixture: ComponentFixture<VehicleAvailablityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAvailablityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAvailablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
