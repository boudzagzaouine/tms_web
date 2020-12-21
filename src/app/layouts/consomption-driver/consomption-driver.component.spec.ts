import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsomptionDriverComponent } from './consomption-driver.component';

describe('ConsomptionDriverComponent', () => {
  let component: ConsomptionDriverComponent;
  let fixture: ComponentFixture<ConsomptionDriverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsomptionDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsomptionDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
