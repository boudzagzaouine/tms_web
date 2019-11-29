import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCategorieComponent } from './vehicle-categorie.component';

describe('VehicleCategorieComponent', () => {
  let component: VehicleCategorieComponent;
  let fixture: ComponentFixture<VehicleCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
