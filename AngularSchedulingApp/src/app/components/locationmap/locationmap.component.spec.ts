import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmapComponent } from './locationmap.component';

describe('LocationmapComponent', () => {
  let component: LocationmapComponent;
  let fixture: ComponentFixture<LocationmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
