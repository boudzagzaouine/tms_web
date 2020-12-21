import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransportCategoryVehicleEditComponent } from './transport-category-vehicle-edit.component';

describe('TransportCategoryVehicleEditComponent', () => {
  let component: TransportCategoryVehicleEditComponent;
  let fixture: ComponentFixture<TransportCategoryVehicleEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCategoryVehicleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCategoryVehicleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
