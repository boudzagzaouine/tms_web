/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderTransportCancelComponent } from './order-transport-cancel.component';

describe('OrderTransportCancelComponent', () => {
  let component: OrderTransportCancelComponent;
  let fixture: ComponentFixture<OrderTransportCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTransportCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTransportCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
