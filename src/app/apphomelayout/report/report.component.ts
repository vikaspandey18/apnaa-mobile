import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportData } from 'src/app/models/report.model';
import { loadReport } from './state/report.actions';
import {
  selectReportData,
  selectReportLoading,
  selectReportError,
} from './state/report.selectors';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  report$!: Observable<ReportData | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadReport());

    this.report$ = this.store.select(selectReportData);
    this.loading$ = this.store.select(selectReportLoading);
    this.error$ = this.store.select(selectReportError);
  }

  retry(): void {
    this.store.dispatch(loadReport());
  }
}

