import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneVilleEditComponent } from './zone-ville-edit.component';

describe('ZoneVilleEditComponent', () => {
  let component: ZoneVilleEditComponent;
  let fixture: ComponentFixture<ZoneVilleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneVilleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneVilleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
