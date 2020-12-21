import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceActionEditComponent } from './maintenance-action-edit.component';

describe('MaintenanceActionEditComponent', () => {
  let component: MaintenanceActionEditComponent;
  let fixture: ComponentFixture<MaintenanceActionEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceActionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
