import { BannerModel } from 'src/app/models/banner.model';

export interface BannerState {
  banners: BannerModel[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: BannerState = {
  banners: [],
  loading: false,
  error: null,
};
