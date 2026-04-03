import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { WalletHistoryModel } from 'src/app/models/wallert-history.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  getAllTransactionsHistory(): Observable<ApiResposne<WalletHistoryModel[]>> {
    const url = `${environment.apiUrl}/promoter/walletHistory.php`;
    return this.http.get<ApiResposne<WalletHistoryModel[]>>(url);
  }
}
