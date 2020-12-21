import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComsumptionTypeComponent } from './comsumption-type.component';

describe('ComsumptionTypeComponent', () => {
  let component: ComsumptionTypeComponent;
  let fixture: ComponentFixture<ComsumptionTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComsumptionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComsumptionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
