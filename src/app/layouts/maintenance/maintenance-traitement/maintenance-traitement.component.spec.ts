import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceTraitementComponent } from './maintenance-traitement.component';

describe('MaintenanceTraitementComponent', () => {
  let component: MaintenanceTraitementComponent;
  let fixture: ComponentFixture<MaintenanceTraitementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
