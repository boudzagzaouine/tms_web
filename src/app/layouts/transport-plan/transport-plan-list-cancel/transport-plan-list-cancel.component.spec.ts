/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportPlanListCancelComponent } from './transport-plan-list-cancel.component';

describe('TransportPlanListCancelComponent', () => {
  let component: TransportPlanListCancelComponent;
  let fixture: ComponentFixture<TransportPlanListCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportPlanListCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportPlanListCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
