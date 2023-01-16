/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RejetsComponent } from './rejets.component';

describe('RejetsComponent', () => {
  let component: RejetsComponent;
  let fixture: ComponentFixture<RejetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
