/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportAccountPricingEditComponent } from './transport-account-pricing-edit.component';

describe('TransportAccountPricingEditComponent', () => {
  let component: TransportAccountPricingEditComponent;
  let fixture: ComponentFixture<TransportAccountPricingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportAccountPricingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportAccountPricingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
