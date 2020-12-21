import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuMaintenanceComponent } from './menu-maintenance.component';

describe('MenuMaintenanceComponent', () => {
  let component: MenuMaintenanceComponent;
  let fixture: ComponentFixture<MenuMaintenanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
