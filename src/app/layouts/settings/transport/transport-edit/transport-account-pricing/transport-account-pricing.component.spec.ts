/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportAccountPricingComponent } from './transport-account-pricing.component';

describe('TransportAccountPricingComponent', () => {
  let component: TransportAccountPricingComponent;
  let fixture: ComponentFixture<TransportAccountPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportAccountPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportAccountPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
