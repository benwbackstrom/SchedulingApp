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
import { LocationmapComponent } from './components/locationmap/locationmap.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CalendarComponent,
    ConfirmationComponent,
    LocationmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    ApptTransferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
