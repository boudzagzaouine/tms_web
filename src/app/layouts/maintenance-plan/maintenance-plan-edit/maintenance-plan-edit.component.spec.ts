import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePlanEditComponent } from './maintenance-plan-edit.component';

describe('MaintenancePlanEditComponent', () => {
  let component: MaintenancePlanEditComponent;
  let fixture: ComponentFixture<MaintenancePlanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePlanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
