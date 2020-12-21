import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceTypeComponent } from './maintenance-type.component';

describe('MaintenanceTypeComponent', () => {
  let component: MaintenanceTypeComponent;
  let fixture: ComponentFixture<MaintenanceTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
