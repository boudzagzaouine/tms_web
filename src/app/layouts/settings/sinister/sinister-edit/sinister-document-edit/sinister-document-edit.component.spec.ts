/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SinisterDocumentEditComponent } from './sinister-document-edit.component';

describe('SinisterDocumentEditComponent', () => {
  let component: SinisterDocumentEditComponent;
  let fixture: ComponentFixture<SinisterDocumentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinisterDocumentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinisterDocumentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
