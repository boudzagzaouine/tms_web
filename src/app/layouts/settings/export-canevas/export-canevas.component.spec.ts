/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExportCanevasComponent } from './export-canevas.component';

describe('ExportCanevasComponent', () => {
  let component: ExportCanevasComponent;
  let fixture: ComponentFixture<ExportCanevasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCanevasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCanevasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
