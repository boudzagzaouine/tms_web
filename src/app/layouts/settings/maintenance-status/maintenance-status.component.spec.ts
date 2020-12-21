import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceStatusComponent } from './maintenance-status.component';

describe('MaintenanceStatusComponent', () => {
  let component: MaintenanceStatusComponent;
  let fixture: ComponentFixture<MaintenanceStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
