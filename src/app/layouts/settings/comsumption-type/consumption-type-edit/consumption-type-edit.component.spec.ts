import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionTypeEditComponent } from './consumption-type-edit.component';

describe('ConsumptionTypeEditComponent', () => {
  let component: ConsumptionTypeEditComponent;
  let fixture: ComponentFixture<ConsumptionTypeEditComponent>;

  beforeEach(async(() => {
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
