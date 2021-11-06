import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LocationmapComponent } from './components/locationmap/locationmap.component';
import { DatetimeComponent } from './components/datetime/datetime.component';

const routes: Routes = [
  {path: 'form', component: FormComponent },
  {path: '', redirectTo: '/form', pathMatch: 'full'},
  {path: 'confirm', component: ConfirmationComponent},
  {path: "calendar", component: CalendarComponent},
  {path:"map", component: LocationmapComponent},
  {path:"datetime", component: DatetimeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
