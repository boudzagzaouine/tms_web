import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceTypeEditComponent } from './maintenance-type-edit.component';

describe('MaintenanceTypeEditComponent', () => {
  let component: MaintenanceTypeEditComponent;
  let fixture: ComponentFixture<MaintenanceTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
