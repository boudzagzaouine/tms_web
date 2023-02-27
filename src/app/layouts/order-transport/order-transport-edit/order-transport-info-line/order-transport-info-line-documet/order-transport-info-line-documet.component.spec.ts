/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderTransportInfoLineDocumetComponent } from './order-transport-info-line-documet.component';

describe('OrderTransportInfoLineDocumetComponent', () => {
  let component: OrderTransportInfoLineDocumetComponent;
  let fixture: ComponentFixture<OrderTransportInfoLineDocumetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTransportInfoLineDocumetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTransportInfoLineDocumetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
