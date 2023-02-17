/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgencyEditComponent } from './agency-edit.component';

describe('AgencyEditComponent', () => {
  let component: AgencyEditComponent;
  let fixture: ComponentFixture<AgencyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
