import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { MrpTicket, TicketRespone } from 'src/app/models/ticket.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  getEventTicket(id: string): Observable<ApiResposne<TicketRespone[]>> {
    const url = `${environment.apiUrl}/event/getTicket.php/${id}`;
    return this.http.get<ApiResposne<TicketRespone[]>>(url);
  }

  getTicketById(id: string): Observable<ApiResposne<MrpTicket>> {
    const url = `${environment.apiUrl}/ticket/getMrpOfTicket.php/${id}`;
    return this.http.get<ApiResposne<MrpTicket>>(url);
  }
}
