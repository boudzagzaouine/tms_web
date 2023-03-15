/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportPlanCancelComponent } from './transport-plan-cancel.component';

describe('TransportPlanCancelComponent', () => {
  let component: TransportPlanCancelComponent;
  let fixture: ComponentFixture<TransportPlanCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportPlanCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportPlanCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
