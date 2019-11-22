import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeEditComponent } from './badge-edit.component';

describe('BadgeEditComponent', () => {
  let component: BadgeEditComponent;
  let fixture: ComponentFixture<BadgeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
