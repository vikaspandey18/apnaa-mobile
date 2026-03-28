import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { TransacResponse } from 'src/app/models/transac.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AlltransactionService {
  constructor(private http: HttpClient) {}

  getLatestBookings(): Observable<ApiResposne<TransacResponse[]>> {
    const url = `${environment.apiUrl}/ticket/getAllBooking.php?limit=5`;
    return this.http.get<ApiResposne<TransacResponse[]>>(url);
  }

  getAllBookings(): Observable<ApiResposne<TransacResponse[]>> {
    const url = `${environment.apiUrl}/ticket/getAllBooking.php?limit=all`;
    return this.http.get<ApiResposne<TransacResponse[]>>(url);
  }
}
