import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLineEditComponent } from './maintenance-line-edit.component';

describe('MaintenanceLineEditComponent', () => {
  let component: MaintenanceLineEditComponent;
  let fixture: ComponentFixture<MaintenanceLineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceLineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
