import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectiveComponent } from './corrective.component';

describe('CorrectiveComponent', () => {
  let component: CorrectiveComponent;
  let fixture: ComponentFixture<CorrectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
