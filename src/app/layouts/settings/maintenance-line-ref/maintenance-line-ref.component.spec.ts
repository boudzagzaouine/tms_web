import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLineRefComponent } from './maintenance-line-ref.component';

describe('MaintenanceLineRefComponent', () => {
  let component: MaintenanceLineRefComponent;
  let fixture: ComponentFixture<MaintenanceLineRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceLineRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLineRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
