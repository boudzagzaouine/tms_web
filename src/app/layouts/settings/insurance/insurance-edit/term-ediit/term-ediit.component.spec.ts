import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TermEdiitComponent } from './term-ediit.component';

describe('TermEdiitComponent', () => {
  let component: TermEdiitComponent;
  let fixture: ComponentFixture<TermEdiitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TermEdiitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermEdiitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
