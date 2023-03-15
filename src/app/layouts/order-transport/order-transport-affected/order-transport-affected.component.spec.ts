/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderTransportAffectedComponent } from './order-transport-affected.component';

describe('OrderTransportAffectedComponent', () => {
  let component: OrderTransportAffectedComponent;
  let fixture: ComponentFixture<OrderTransportAffectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTransportAffectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTransportAffectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
