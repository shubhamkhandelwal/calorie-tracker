import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DayComponent } from './pages/day/day.component';
import { MonthComponent } from './pages/month/month.component';

const routes: Routes = [
 
  { path: 'month/:month', component: MonthComponent},
  { path: 'month/:month/:day', component: DayComponent},
  { path: '', component: CalendarComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
