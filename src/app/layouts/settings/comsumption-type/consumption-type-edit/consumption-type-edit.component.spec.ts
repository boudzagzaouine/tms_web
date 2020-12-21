import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsumptionTypeEditComponent } from './consumption-type-edit.component';

describe('ConsumptionTypeEditComponent', () => {
  let component: ConsumptionTypeEditComponent;
  let fixture: ComponentFixture<ConsumptionTypeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
