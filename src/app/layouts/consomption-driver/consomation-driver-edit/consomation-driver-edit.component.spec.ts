import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsomationDriverEditComponent } from './consomation-driver-edit.component';

describe('ConsomationDriverEditComponent', () => {
  let component: ConsomationDriverEditComponent;
  let fixture: ComponentFixture<ConsomationDriverEditComponent>;

  beforeEach(async(() => {
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
