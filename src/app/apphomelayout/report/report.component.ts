import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  // Observables to bind data reactively to the HTML template
  report$!: Observable<ReportData | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  // Form group to manage date range selection inputs
  filterForm!: FormGroup;

  // Constructor injecting Angular FormBuilder and NgRx Store
  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // 1. Get dates for the initial load (default: 1st of current month to today)
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 2. Initialize the Reactive Form with default values
    this.filterForm = this.fb.group({
      fromdate: [this.formatDate(firstDayOfMonth), Validators.required],
      todate: [this.formatDate(today), Validators.required]
    });

    // 3. Connect local observables with store selectors
    this.report$ = this.store.select(selectReportData);
    this.loading$ = this.store.select(selectReportLoading);
    this.error$ = this.store.select(selectReportError);

    // 4. Trigger the initial data fetch
    this.loadData();
  }

  // Helper method to format Date objects as 'YYYY-MM-DD' for HTML date inputs
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Method to dispatch loadReport action to NgRx with form date parameters
  loadData(): void {
    const { fromdate, todate } = this.filterForm.value;
    this.store.dispatch(loadReport({ fromdate, todate }));
  }

  // Triggered when user submits the filter form
  onSubmit(): void {
    if (this.filterForm.valid) {
      this.loadData();
    }
  }

  // Triggered by the retry button on error screen
  retry(): void {
    this.loadData();
  }
}
