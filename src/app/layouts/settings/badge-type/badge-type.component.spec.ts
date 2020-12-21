import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BadgeTypeComponent } from './badge-type.component';

describe('BadgeTypeComponent', () => {
  let component: BadgeTypeComponent;
  let fixture: ComponentFixture<BadgeTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
