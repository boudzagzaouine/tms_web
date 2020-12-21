import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuInsuranceComponent } from './menu-insurance.component';

describe('MenuInsuranceComponent', () => {
  let component: MenuInsuranceComponent;
  let fixture: ComponentFixture<MenuInsuranceComponent>;

  beforeEach(waitForAsync(() => {
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
