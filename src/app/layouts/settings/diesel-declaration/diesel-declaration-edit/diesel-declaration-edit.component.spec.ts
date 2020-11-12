/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DieselDeclarationEditComponent } from './diesel-declaration-edit.component';

describe('DieselDeclarationEditComponent', () => {
  let component: DieselDeclarationEditComponent;
  let fixture: ComponentFixture<DieselDeclarationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieselDeclarationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselDeclarationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
