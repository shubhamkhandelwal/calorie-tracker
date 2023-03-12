import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Month } from 'src/app/interface/month';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
})
export class MonthComponent implements OnInit {
  month: Month = {
    name: '',
    short: '',
    number: 0,
    days: 0,
  };
  days: number[] = [];

  constructor(
    private calendar: CalendarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.month = this.calendar.getMonth(
      this.route.snapshot.paramMap.get('month')!
    );
    this.days = Array(this.month.days).fill(0).map((x,i) => ++i);
  }

  goBack(): void {
    this.router.navigate(['/'])
  }
}
