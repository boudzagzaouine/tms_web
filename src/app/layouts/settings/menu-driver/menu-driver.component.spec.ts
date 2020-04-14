import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDriverComponent } from './menu-driver.component';

describe('MenuDriverComponent', () => {
  let component: MenuDriverComponent;
  let fixture: ComponentFixture<MenuDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
