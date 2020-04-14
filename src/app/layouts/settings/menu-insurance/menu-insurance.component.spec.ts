import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInsuranceComponent } from './menu-insurance.component';

describe('MenuInsuranceComponent', () => {
  let component: MenuInsuranceComponent;
  let fixture: ComponentFixture<MenuInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
