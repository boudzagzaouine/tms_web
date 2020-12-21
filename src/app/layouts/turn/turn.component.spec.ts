import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TurnComponent } from './turn.component';

describe('TurnComponent', () => {
  let component: TurnComponent;
  let fixture: ComponentFixture<TurnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
