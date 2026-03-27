export interface ApiResposne<T> {
  status: string;
  message: string;
  data: T;
}
