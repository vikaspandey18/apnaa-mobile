import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResposne } from 'src/app/models/api-response.model';
import { AuthResponse } from 'src/app/models/auth-response';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl;

  login(
    mobile: string,
    password: string,
  ): Observable<ApiResposne<AuthResponse>> {
    const url = `${this.baseUrl}/auth/login.php`;
    const body = { mobile, password };

    return this.http.post<ApiResposne<AuthResponse>>(url, body);
  }

  storeUserInLocalStorate(auth: AuthResponse) {
    try {
      localStorage.setItem('apnaaAuth', JSON.stringify(auth));
    } catch (e) {
      console.log('There was error in saving data to localstorage');
    }
  }

  getUserFromLocalStorage() {
    try {
      const loggedUser = localStorage.getItem('apnaaAuth');
      if (!loggedUser) {
        return null;
      }

      const user = JSON.parse(loggedUser);
      return user;
    } catch (error) {
      console.log(error);
      localStorage.removeItem('apnaaAuth');
      return null;
    }
  }


  logout() {
    try {
      localStorage.removeItem('apnaaAuth');
    } catch (error) {
      console.error('Failed to Logout User, Kindly contact the developer');
    }
  }

  
}
