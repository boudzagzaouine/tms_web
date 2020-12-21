import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenancePreventiveComponent } from './maintenance-preventive.component';

describe('MaintenancePreventiveComponent', () => {
  let component: MaintenancePreventiveComponent;
  let fixture: ComponentFixture<MaintenancePreventiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePreventiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePreventiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
