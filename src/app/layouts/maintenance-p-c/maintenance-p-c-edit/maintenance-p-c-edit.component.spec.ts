import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePCEditComponent } from './maintenance-p-c-edit.component';

describe('MaintenancePCEditComponent', () => {
  let component: MaintenancePCEditComponent;
  let fixture: ComponentFixture<MaintenancePCEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePCEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePCEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
