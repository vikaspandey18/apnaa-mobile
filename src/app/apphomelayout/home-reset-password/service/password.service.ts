import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  resetpassword(formData: FormData): Observable<ApiResposne<null>> {
    const url = `${environment.apiUrl}/auth/resetPassword.php`;
    return this.http.post<ApiResposne<null>>(url, formData);
  }
}
