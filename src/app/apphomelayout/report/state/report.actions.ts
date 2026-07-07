import { createAction, props } from '@ngrx/store';
import { ReportData } from 'src/app/models/report.model';

export const loadReport = createAction(
  '[Report] Load Report',
  props<{ fromdate: string; todate: string }>(),
);

export const loadReportSuccess = createAction(
  '[Report] Load Report Success',
  props<{ reportData: ReportData }>(),
);

export const loadReportFailure = createAction(
  '[Report] Load Report Failure',
  props<{ error: string }>(),
);
