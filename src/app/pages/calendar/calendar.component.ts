import { Component } from '@angular/core';
import { Month } from 'src/app/interface/month';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  months: Month[];

  constructor(private calendar: CalendarService) {
    this.months = this.calendar.getCalendar();
  }
 
}
