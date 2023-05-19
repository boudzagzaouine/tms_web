import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsDashboardDriverComponent } from './tms-dashboard-driver.component';

describe('TmsDashboardDriverComponent', () => {
  let component: TmsDashboardDriverComponent;
  let fixture: ComponentFixture<TmsDashboardDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmsDashboardDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsDashboardDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
