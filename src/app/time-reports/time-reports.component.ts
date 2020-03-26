import { Component, OnInit } from '@angular/core';
import { TimeReportsService } from '../core/api/services';
import { MonthlyAggregateDto } from '../core/api/models';
import * as moment from 'moment';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-time-reports',
  templateUrl: './time-reports.component.html',
  styleUrls: ['./time-reports.component.scss']
})
export class TimeReportsComponent implements OnInit {
  public thisMonthSummary$: Observable<MonthlyAggregateDto>;
  public previousMonthsReports$: Observable<MonthlyAggregateDto[]>;

  constructor(private service: TimeReportsService) { }

  ngOnInit(): void {
    this.thisMonthSummary$ = this.getMonthAggregate(new Date());
    this.previousMonthsReports$ = this.getPreviousMonthsTimeReports(3);
  }

  getPreviousMonthsTimeReports(monthsToFetch: number) {
    const timeReportArrays = [] as Observable<MonthlyAggregateDto>[];
    for (let i = 1; i <= monthsToFetch; i++) {
      const lastMonth = moment().subtract(i, 'months').toDate();
      timeReportArrays.push(this.getMonthAggregate(lastMonth))
    }
    return forkJoin(timeReportArrays);
  }

  getMonthAggregate(date: Date) {
    return this.service.getMonthAggregate({
      month: date.toLocaleDateString()
    });
  }

  routerLink(aggregate: MonthlyAggregateDto) {
    const thisMonth = moment(aggregate.sent);
    const routes = [
      thisMonth.year(),
      thisMonth.format('MM'),
      'summary'
    ];
    return routes;
  }

  requestTimeReports(date: string) {
    this.service
      .sendTimeReports({ body: { sent: date } })
      .subscribe();
  }

  displayMonthYear(date: string) {
    return moment(date).format('MMMM');
  }
}
