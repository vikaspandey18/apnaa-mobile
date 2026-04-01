import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PromoterModel } from 'src/app/models/promoter.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AddPromoterService {
  constructor(private http: HttpClient) {}

  addPromoter(data: PromoterModel) {
    const url = `${environment.apiUrl}/promoter/addPromoter.php`;
    return this.http.post(url, data);
  }
}
