import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsomtionTypeEditComponent } from './consomtion-type-edit.component';

describe('ConsomtionTypeEditComponent', () => {
  let component: ConsomtionTypeEditComponent;
  let fixture: ComponentFixture<ConsomtionTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsomtionTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsomtionTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
