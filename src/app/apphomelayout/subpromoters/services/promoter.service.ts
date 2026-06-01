import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { PromoterModel } from 'src/app/models/promoter.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PromoterService {
  constructor(private http: HttpClient) {}

  addPromoter(data: PromoterModel) {
    const url = `${environment.apiUrl}/promoter/addPromoter.php`;
    return this.http.post(url, data);
  }

  getPromoters(): Observable<ApiResposne<PromoterModel[]>> {
    const url = `${environment.apiUrl}/promoter/getPromoter.php`;
    return this.http.get<ApiResposne<PromoterModel[]>>(url);
  }

  addBalance(
    promoterId: string,
    amount: number,
  ): Observable<ApiResposne<null>> {
    const url = `${environment.apiUrl}/promoter/addBalance.php`;
    const body = { promoterId, amount };
    return this.http.post<ApiResposne<null>>(url, body);
  }

  deductBalance(
    promoterId: string,
    amount: number,
  ): Observable<ApiResposne<null>> {
    const url = `${environment.apiUrl}/promoter/deductBalance.php`;
    const body = { promoterId, amount };
    return this.http.post<ApiResposne<null>>(url, body);
  }
}
