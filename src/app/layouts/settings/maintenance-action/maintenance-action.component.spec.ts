import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceActionComponent } from './maintenance-action.component';

describe('MaintenanceActionComponent', () => {
  let component: MaintenanceActionComponent;
  let fixture: ComponentFixture<MaintenanceActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
