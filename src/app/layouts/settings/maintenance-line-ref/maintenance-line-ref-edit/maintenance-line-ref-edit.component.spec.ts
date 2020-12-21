import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceLineRefEditComponent } from './maintenance-line-ref-edit.component';

describe('MaintenanceLineRefEditComponent', () => {
  let component: MaintenanceLineRefEditComponent;
  let fixture: ComponentFixture<MaintenanceLineRefEditComponent>;

  beforeEach(waitForAsync(() => {
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
