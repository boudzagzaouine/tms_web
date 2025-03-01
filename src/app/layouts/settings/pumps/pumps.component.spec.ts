/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PumpsComponent } from './pumps.component';

describe('PumpsComponent', () => {
  let component: PumpsComponent;
  let fixture: ComponentFixture<PumpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
