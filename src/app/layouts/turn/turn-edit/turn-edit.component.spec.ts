import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnEditComponent } from './turn-edit.component';

describe('TurnEditComponent', () => {
  let component: TurnEditComponent;
  let fixture: ComponentFixture<TurnEditComponent>;

  beforeEach(async(() => {
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
