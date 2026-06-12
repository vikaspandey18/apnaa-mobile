import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { CategoryModel } from 'src/app/models/category.model';
import { EventResponse } from 'src/app/models/event.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl;

  getEvents(): Observable<ApiResposne<EventResponse[]>> {
    const url = `${this.baseUrl}/event/allEvent.php`;
    return this.http.get<ApiResposne<EventResponse[]>>(url);
  }

  getAllCategory(): Observable<ApiResposne<CategoryModel[]>> {
    const url = `${this.baseUrl}/category/getAllCategory.php`;
    return this.http.get<ApiResposne<CategoryModel[]>>(url);
  }
}
