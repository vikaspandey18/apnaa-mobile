import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { TransacResponse } from 'src/app/models/transac.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SubpromoterprofileService {
  constructor(private http: HttpClient) {}

  getSubPromoterDetails(
    promoterId: string,
  ): Observable<ApiResposne<TransacResponse[]>> {
    const url = `${environment.apiUrl}/ticket/getSubPromoterBooking.php`;
    return this.http.get<ApiResposne<TransacResponse[]>>(url, {
      params: { promoterId },
    });
  }
}
