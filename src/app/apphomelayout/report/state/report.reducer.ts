import { createReducer, on } from '@ngrx/store';
import { initialState } from './report.state';
import {
  loadReport,
  loadReportSuccess,
  loadReportFailure,
} from './report.actions';

export const reportReducer = createReducer(
  initialState,
  on(loadReport, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadReportSuccess, (state, { reportData }) => ({
    ...state,
    loading: false,
    reportData,
  })),
  on(loadReportFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
