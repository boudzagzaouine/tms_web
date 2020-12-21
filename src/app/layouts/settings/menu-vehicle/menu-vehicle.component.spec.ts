import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuVehicleComponent } from './menu-vehicle.component';

describe('MenuVehicleComponent', () => {
  let component: MenuVehicleComponent;
  let fixture: ComponentFixture<MenuVehicleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
