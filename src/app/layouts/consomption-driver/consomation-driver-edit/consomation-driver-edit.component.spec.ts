import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsomationDriverEditComponent } from './consomation-driver-edit.component';

describe('ConsomationDriverEditComponent', () => {
  let component: ConsomationDriverEditComponent;
  let fixture: ComponentFixture<ConsomationDriverEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsomationDriverEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsomationDriverEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
