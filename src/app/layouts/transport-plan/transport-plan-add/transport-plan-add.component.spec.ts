/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportPlanAddComponent } from './transport-plan-add.component';

describe('TransportPlanAddComponent', () => {
  let component: TransportPlanAddComponent;
  let fixture: ComponentFixture<TransportPlanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportPlanAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportPlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
