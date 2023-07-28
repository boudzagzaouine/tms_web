import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneVilleComponent } from './zone-ville.component';

describe('ZoneVilleComponent', () => {
  let component: ZoneVilleComponent;
  let fixture: ComponentFixture<ZoneVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneVilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
