import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { Result } from 'src/app/models/result.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(private http: HttpClient) {}

  addTicke(data: any): Observable<Result> {
    const url = `${environment.apiUrl}/ticket/addTicket.php`;

    return this.http.post<Result>(url, data);
  }
}
