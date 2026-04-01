import { PromoterModel } from 'src/app/models/promoter.model';

export interface PromoterState {
  promoters: PromoterModel[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: PromoterState = {
  promoters: [],
  loading: false,
  error: null,
};
