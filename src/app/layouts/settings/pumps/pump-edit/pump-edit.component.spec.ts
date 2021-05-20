/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PumpEditComponent } from './pump-edit.component';

describe('PumpEditComponent', () => {
  let component: PumpEditComponent;
  let fixture: ComponentFixture<PumpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
