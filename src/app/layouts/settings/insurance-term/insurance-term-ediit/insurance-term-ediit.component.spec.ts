import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InsuranceTermEdiitComponent } from './insurance-term-ediit.component';

describe('InsuranceTermEdiitComponent', () => {
  let component: InsuranceTermEdiitComponent;
  let fixture: ComponentFixture<InsuranceTermEdiitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceTermEdiitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceTermEdiitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
