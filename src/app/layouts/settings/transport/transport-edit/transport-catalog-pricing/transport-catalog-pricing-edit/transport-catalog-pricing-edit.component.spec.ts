/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportCatalogPricingEditComponent } from './transport-catalog-pricing-edit.component';

describe('TransportCatalogPricingEditComponent', () => {
  let component: TransportCatalogPricingEditComponent;
  let fixture: ComponentFixture<TransportCatalogPricingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCatalogPricingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCatalogPricingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
