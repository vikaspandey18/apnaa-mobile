import { ReportData } from 'src/app/models/report.model';

export interface ReportState {
  reportData: ReportData | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ReportState = {
  reportData: null,
  loading: false,
  error: null,
};
