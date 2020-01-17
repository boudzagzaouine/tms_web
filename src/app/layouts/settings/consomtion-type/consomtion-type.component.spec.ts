import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsomtionTypeComponent } from './consomtion-type.component';

describe('ConsomtionTypeComponent', () => {
  let component: ConsomtionTypeComponent;
  let fixture: ComponentFixture<ConsomtionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsomtionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsomtionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
