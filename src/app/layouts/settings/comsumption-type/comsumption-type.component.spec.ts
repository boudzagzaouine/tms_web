import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComsumptionTypeComponent } from './comsumption-type.component';

describe('ComsumptionTypeComponent', () => {
  let component: ComsumptionTypeComponent;
  let fixture: ComponentFixture<ComsumptionTypeComponent>;

  beforeEach(async(() => {
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
