import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReportState } from './report.state';

export const selectReportState = createFeatureSelector<ReportState>('report');

export const selectReportData = createSelector(
  selectReportState,
  (state) => state?.reportData,
);

export const selectReportLoading = createSelector(
  selectReportState,
  (state) => state?.loading,
);

export const selectReportError = createSelector(
  selectReportState,
  (state) => state?.error,
);
