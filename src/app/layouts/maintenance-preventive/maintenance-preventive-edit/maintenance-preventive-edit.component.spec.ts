import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenancePreventiveEditComponent } from './maintenance-preventive-edit.component';

describe('MaintenancePreventiveEditComponent', () => {
  let component: MaintenancePreventiveEditComponent;
  let fixture: ComponentFixture<MaintenancePreventiveEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePreventiveEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePreventiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
