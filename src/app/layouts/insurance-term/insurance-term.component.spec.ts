import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTermComponent } from './insurance-term.component';

describe('InsuranceTermComponent', () => {
  let component: InsuranceTermComponent;
  let fixture: ComponentFixture<InsuranceTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
