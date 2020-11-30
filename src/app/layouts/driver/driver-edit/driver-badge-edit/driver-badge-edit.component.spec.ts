/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DriverBadgeEditComponent } from './driver-badge-edit.component';

describe('DriverBadgeEditComponent', () => {
  let component: DriverBadgeEditComponent;
  let fixture: ComponentFixture<DriverBadgeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverBadgeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBadgeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
