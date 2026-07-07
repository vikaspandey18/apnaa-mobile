import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { ReportData } from 'src/app/models/report.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReport(fromdate: string, todate: string): Observable<ApiResposne<ReportData>> {
    const url = `${environment.apiUrl}/report/getReport.php?fromdate=${fromdate}&todate=${todate}`;
    return this.http.get<ApiResposne<ReportData>>(url);
  }

}
