import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVehicleComponent } from './menu-vehicle.component';

describe('MenuVehicleComponent', () => {
  let component: MenuVehicleComponent;
  let fixture: ComponentFixture<MenuVehicleComponent>;

  beforeEach(async(() => {
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
