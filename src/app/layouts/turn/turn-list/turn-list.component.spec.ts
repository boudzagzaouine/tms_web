import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TurnListComponent } from './turn-list.component';

describe('TurnListComponent', () => {
  let component: TurnListComponent;
  let fixture: ComponentFixture<TurnListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
