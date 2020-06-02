import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLineRefEditComponent } from './maintenance-line-ref-edit.component';

describe('MaintenanceLineRefEditComponent', () => {
  let component: MaintenanceLineRefEditComponent;
  let fixture: ComponentFixture<MaintenanceLineRefEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceLineRefEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLineRefEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
