/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BonEditComponent } from './bon-edit.component';

describe('BonEditComponent', () => {
  let component: BonEditComponent;
  let fixture: ComponentFixture<BonEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
