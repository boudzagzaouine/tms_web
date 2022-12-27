/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PricingStandardComponent } from './pricing-standard.component';

describe('PricingStandardComponent', () => {
  let component: PricingStandardComponent;
  let fixture: ComponentFixture<PricingStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
