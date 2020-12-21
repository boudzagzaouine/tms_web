import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InsuranceTypeComponent } from './insurance-type.component';

describe('InsuranceTypeComponent', () => {
  let component: InsuranceTypeComponent;
  let fixture: ComponentFixture<InsuranceTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
