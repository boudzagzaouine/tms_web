/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RefusEditComponent } from './refus-edit.component';

describe('RefusEditComponent', () => {
  let component: RefusEditComponent;
  let fixture: ComponentFixture<RefusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
