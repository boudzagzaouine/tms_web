import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCategoryVehicleEditComponent } from './transport-category-vehicle-edit.component';

describe('TransportCategoryVehicleEditComponent', () => {
  let component: TransportCategoryVehicleEditComponent;
  let fixture: ComponentFixture<TransportCategoryVehicleEditComponent>;

  beforeEach(async(() => {
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
