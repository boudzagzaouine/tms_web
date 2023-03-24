/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportPlanTarifTrajetTransportComponent } from './transport-plan-tarif-trajet-transport.component';

describe('TransportPlanTarifTrajetTransportComponent', () => {
  let component: TransportPlanTarifTrajetTransportComponent;
  let fixture: ComponentFixture<TransportPlanTarifTrajetTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportPlanTarifTrajetTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportPlanTarifTrajetTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
