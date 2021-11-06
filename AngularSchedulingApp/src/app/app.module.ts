import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

import { ApptTransferService } from './services/appt-transfer.service';
import { ConfirmationService } from './services/confirmation.service';
import { LocationmapComponent } from './components/locationmap/locationmap.component';
import { HttpClientModule } from '@angular/common/http';
import { MeterToMilePipe } from './pipes/meter-to-mile.pipe';
import { DatetimeComponent } from './components/datetime/datetime.component';
import { MilitaryToRegularTimePipe } from './pipes/military-to-regular-time.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CalendarComponent,
    ConfirmationComponent,
    LocationmapComponent,
    MeterToMilePipe,
    DatetimeComponent,
    MilitaryToRegularTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    ApptTransferService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
