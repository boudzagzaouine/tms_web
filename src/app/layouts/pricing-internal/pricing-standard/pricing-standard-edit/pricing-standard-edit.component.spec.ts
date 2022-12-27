/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PricingStandardEditComponent } from './pricing-standard-edit.component';

describe('PricingStandardEditComponent', () => {
  let component: PricingStandardEditComponent;
  let fixture: ComponentFixture<PricingStandardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingStandardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingStandardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
