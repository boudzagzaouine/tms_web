/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RejetEditComponent } from './rejet-edit.component';

describe('RejetEditComponent', () => {
  let component: RejetEditComponent;
  let fixture: ComponentFixture<RejetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
