import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { BannerModel } from 'src/app/models/banner.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private http: HttpClient) {}

  showAllBanner(): Observable<ApiResposne<BannerModel[]>> {
    const url = `${environment.apiUrl}/banner/allBanner.php`;

    return this.http.get<ApiResposne<BannerModel[]>>(url);
  }
}
