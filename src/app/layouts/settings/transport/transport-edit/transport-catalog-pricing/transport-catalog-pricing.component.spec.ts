/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportCatalogPricingComponent } from './transport-catalog-pricing.component';

describe('TransportCatalogPricingComponent', () => {
  let component: TransportCatalogPricingComponent;
  let fixture: ComponentFixture<TransportCatalogPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCatalogPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCatalogPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
