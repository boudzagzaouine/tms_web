import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransportCategoryVehicleComponent } from './transport-category-vehicle.component';

describe('TransportCategoryVehicleComponent', () => {
  let component: TransportCategoryVehicleComponent;
  let fixture: ComponentFixture<TransportCategoryVehicleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCategoryVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCategoryVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
