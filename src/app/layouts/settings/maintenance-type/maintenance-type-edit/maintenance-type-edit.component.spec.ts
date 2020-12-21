import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceTypeEditComponent } from './maintenance-type-edit.component';

describe('MaintenanceTypeEditComponent', () => {
  let component: MaintenanceTypeEditComponent;
  let fixture: ComponentFixture<MaintenanceTypeEditComponent>;

  beforeEach(waitForAsync(() => {
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
