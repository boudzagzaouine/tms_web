/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenerateSupplierInvoiceFromReceptionComponent } from './generate-supplier-invoice-from-reception.component';

describe('GenerateSupplierInvoiceFromReceptionComponent', () => {
  let component: GenerateSupplierInvoiceFromReceptionComponent;
  let fixture: ComponentFixture<GenerateSupplierInvoiceFromReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateSupplierInvoiceFromReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateSupplierInvoiceFromReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
