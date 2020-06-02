import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceActionEditComponent } from './maintenance-action-edit.component';

describe('MaintenanceActionEditComponent', () => {
  let component: MaintenanceActionEditComponent;
  let fixture: ComponentFixture<MaintenanceActionEditComponent>;

  beforeEach(async(() => {
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
