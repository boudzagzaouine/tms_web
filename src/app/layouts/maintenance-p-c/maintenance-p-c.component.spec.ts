import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePCComponent } from './maintenance-p-c.component';

describe('MaintenancePCComponent', () => {
  let component: MaintenancePCComponent;
  let fixture: ComponentFixture<MaintenancePCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
