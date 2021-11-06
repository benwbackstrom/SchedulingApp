import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { LocationmapComponent } from './locationmap.component';
import { MeterToMilePipe } from 'src/app/pipes/meter-to-mile.pipe';

describe('LocationmapComponent', () => {
  let component: LocationmapComponent;
  let fixture: ComponentFixture<LocationmapComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationmapComponent, MeterToMilePipe ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserModule
      ]
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

  it('should call the changeMapCenter method', async () => {
    spyOn(component, 'changeMapCenter');
    el = fixture.debugElement.query(By.css('tr')).nativeElement;
    el.click();
    expect(component.changeMapCenter).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })

  it('should call the chooseLocation method', async () => {
    spyOn(component, 'chooseLocation');
    el = fixture.debugElement.query(By.css('.chooseLocation')).nativeElement;
    //must choose this one by class since there are multiple buttons in the template
    el.click();
    expect(component.chooseLocation).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })

  it('should call the changeMap method', async () => {
    spyOn(component, 'changeMap');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.changeMap).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })

  it('should have populated the location array on startup', () => {
    expect(component.aptLocationArray).toBeTruthy();
  })
});
