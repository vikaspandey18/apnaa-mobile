import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReportService } from '../service/report.service';
import {
  loadReport,
  loadReportSuccess,
  loadReportFailure,
} from './report.actions';

@Injectable()
export class ReportEffects {
  constructor(
    private actions$: Actions,
    private reportService: ReportService,
  ) {}

  loadReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReport),
      switchMap((action) =>
        this.reportService.getReport(action.fromdate, action.todate).pipe(
          map((response) => loadReportSuccess({ reportData: response.data })),
          catchError((err) =>
            of(
              loadReportFailure({
                error: err?.error?.message || err?.message || 'Failed to load report',
              }),
            ),
          ),
        ),
      ),
    ),
  );

}
