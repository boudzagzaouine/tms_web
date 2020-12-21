import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BadgeTypeEditComponent } from './badge-type-edit.component';

describe('BadgeTypeEditComponent', () => {
  let component: BadgeTypeEditComponent;
  let fixture: ComponentFixture<BadgeTypeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
