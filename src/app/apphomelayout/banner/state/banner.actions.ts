import { createAction, props } from '@ngrx/store';
import { BannerModel } from 'src/app/models/banner.model';

export const loadBannerStart = createAction('[banner] fetch start');

export const loadBannerSuccess = createAction(
  '[banner] fetch succees',
  props<{ banners: BannerModel[] }>(),
);

export const loadBannerFailed = createAction(
  '[banner] fetch failed',
  props<{ error: string }>(),
);
