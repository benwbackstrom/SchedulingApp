import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

import { ApptTransferService } from './services/appt-transfer.service';
import { ConfirmationService } from './services/confirmation.service';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    ApptTransferService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
