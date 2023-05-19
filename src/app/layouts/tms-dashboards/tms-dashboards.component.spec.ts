import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsDashboardsComponent } from './tms-dashboards.component';

describe('TmsDashboardsComponent', () => {
  let component: TmsDashboardsComponent;
  let fixture: ComponentFixture<TmsDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmsDashboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
