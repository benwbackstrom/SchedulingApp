import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LocationmapComponent } from './locationmap.component';
import { MeterToMilePipe } from 'src/app/pipes/meter-to-mile.pipe';
import { Locationmodel } from 'src/app/models/locationmodel';

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
        BrowserModule,
        FormsModule
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

  /*
  it('should call the changeViewCenter method', async () => {
    //In order to make sure that the tr is shown, we must have it at least have some values
    component.tempAddress = 'Los Angeles';
    component.changeMap();

    spyOn(component, 'changeViewCenter');
    el = fixture.debugElement.query(By.css('tr')).nativeElement;
    el.click();
    expect(component.changeViewCenter).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })

  it('should call the chooseLocation method', async () => {
    //In order to make sure that the element is shown, we must have it at least have some values
    component.tempAddress = 'Los Angeles';
    component.changeMap();
    
    spyOn(component, 'chooseLocation');
    el = fixture.debugElement.query(By.css('.chooseLocation')).nativeElement;
    //must choose this one by class since there are multiple buttons in the template
    el.click();
    expect(component.chooseLocation).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })*/

  it('should call the changeMap method', async () => {
    spyOn(component, 'changeMap');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.changeMap).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })

  it('should call the resetMap method', async () => {
    spyOn(component, 'resetMap');
    el = fixture.debugElement.query(By.css('.resetMap')).nativeElement;
    el.click();
    expect(component.resetMap).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })

  it('should call the useMyLocation method', async () => {
    spyOn(component, 'useMyLocation');
    el = fixture.debugElement.query(By.css('.btn.col-sm-4')).nativeElement;
    el.click();
    expect(component.useMyLocation).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })

  it('should call the goLocation method', async () => {
    component.storeLocation = new Locationmodel("8055 Churchill Way, Dallas, TX 75251", 32.919567, -96.768389, 10); //just making a location to make this nonnull
    fixture.detectChanges();

    spyOn(component, 'goLocation');
    el = fixture.debugElement.query(By.css('.goLocation')).nativeElement;
    el.click();
    expect(component.goLocation).toHaveBeenCalledTimes(1);
    //Test passes if the method has been called
  })

  it('should have populated the location array on startup', () => {
    expect(component.aptLocationArray).toBeTruthy();
  })
});
