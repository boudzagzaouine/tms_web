import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceActionComponent } from './maintenance-action.component';

describe('MaintenanceActionComponent', () => {
  let component: MaintenanceActionComponent;
  let fixture: ComponentFixture<MaintenanceActionComponent>;

  beforeEach(async(() => {
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
