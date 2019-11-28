import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceStatusEditComponent } from './maintenance-status-edit.component';

describe('MaintenanceStatusEditComponent', () => {
  let component: MaintenanceStatusEditComponent;
  let fixture: ComponentFixture<MaintenanceStatusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceStatusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
