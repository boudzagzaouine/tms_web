import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestDataTableComponent } from './test-data-table.component';

describe('TestDataTableComponent', () => {
  let component: TestDataTableComponent;
  let fixture: ComponentFixture<TestDataTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
