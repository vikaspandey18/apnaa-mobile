import { createAction, props } from '@ngrx/store';
import { PromoterModel } from 'src/app/models/promoter.model';

export const loadPromoterStartAction = createAction('[promoter] fetch start');

export const loadPromoterSuccessAction = createAction(
  '[promoter] fetch success',
  props<{ promoters: PromoterModel[] }>(),
);

export const loadPromoterFailedAction = createAction(
  '[promoter] fetch failed',
  props<{ error: string }>(),
);
