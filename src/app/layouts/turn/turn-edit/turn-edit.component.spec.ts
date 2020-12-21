import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TurnEditComponent } from './turn-edit.component';

describe('TurnEditComponent', () => {
  let component: TurnEditComponent;
  let fixture: ComponentFixture<TurnEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
