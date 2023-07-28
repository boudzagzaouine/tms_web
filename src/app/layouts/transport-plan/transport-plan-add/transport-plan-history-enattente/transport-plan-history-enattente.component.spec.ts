/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportPlanHistoryEnattenteComponent } from './transport-plan-history-enattente.component';

describe('TransportPlanHistoryEnattenteComponent', () => {
  let component: TransportPlanHistoryEnattenteComponent;
  let fixture: ComponentFixture<TransportPlanHistoryEnattenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportPlanHistoryEnattenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportPlanHistoryEnattenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
