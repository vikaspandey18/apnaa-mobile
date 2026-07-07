import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResposne } from 'src/app/models/api-response.model';
import { CustomerAuthResponse } from 'src/app/models/customer-auth-response';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.apiUrl;
  private customerSubject = new BehaviorSubject<CustomerAuthResponse | null>(null);
  public customer$ = this.customerSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCustomerFromStorage();
  }

  private loadCustomerFromStorage() {
    try {
      const stored = localStorage.getItem('apnaaCustomerAuth');
      if (stored) {
        this.customerSubject.next(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse customer local storage', e);
    }
  }

  public get customerId(): string | null {
    const cust = this.customerSubject.value;
    return cust ? cust.id : null;
  }

  login(mobile: string, password: string): Observable<ApiResposne<CustomerAuthResponse>> {
    const url = `${this.baseUrl}/customer/login.php`;
    return this.http.post<ApiResposne<CustomerAuthResponse>>(url, { mobile, password }).pipe(
      tap(res => {
        if (res && res.status === 'success' && res.data) {
          localStorage.setItem('apnaaCustomerAuth', JSON.stringify(res.data));
          this.customerSubject.next(res.data);
        }
      })
    );
  }

  register(payload: any): Observable<ApiResposne<CustomerAuthResponse>> {
    const url = `${this.baseUrl}/customer/register.php`;
    return this.http.post<ApiResposne<CustomerAuthResponse>>(url, payload).pipe(
      tap(res => {
        if (res && res.status === 'success' && res.data) {
          localStorage.setItem('apnaaCustomerAuth', JSON.stringify(res.data));
          this.customerSubject.next(res.data);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('apnaaCustomerAuth');
    this.customerSubject.next(null);
  }

  getBanners(): Observable<ApiResposne<any[]>> {
    const url = `${this.baseUrl}/customer/getBanners.php`;
    return this.http.get<ApiResposne<any[]>>(url);
  }

  getEvents(): Observable<ApiResposne<{ categories: any[], events: any[] }>> {
    const url = `${this.baseUrl}/customer/getEvents.php`;
    return this.http.get<ApiResposne<{ categories: any[], events: any[] }>>(url);
  }

  getEventDetails(eventId: string): Observable<ApiResposne<any>> {
    const url = `${this.baseUrl}/customer/getEventDetails.php?event_id=${eventId}`;
    return this.http.get<ApiResposne<any>>(url);
  }

  createBooking(payload: any): Observable<ApiResposne<{ booking_id: string; amount: number; razorpay_order_id: string; key_id: string }>> {
    const url = `${this.baseUrl}/customer/createBooking.php`;
    const headers = new HttpHeaders({
      'X-Customer-Id': this.customerId || ''
    });
    return this.http.post<ApiResposne<{ booking_id: string; amount: number; razorpay_order_id: string; key_id: string }>>(url, payload, { headers });
  }

  updatePaymentStatus(payload: { booking_id: string; razorpay_payment_id: string; razorpay_signature?: string; status: string }): Observable<ApiResposne<any>> {
    const url = `${this.baseUrl}/customer/updatePaymentStatus.php`;
    return this.http.post<ApiResposne<any>>(url, payload);
  }

  getOrders(): Observable<ApiResposne<any[]>> {
    const url = `${this.baseUrl}/customer/getOrders.php`;
    const headers = new HttpHeaders({
      'X-Customer-Id': this.customerId || ''
    });
    return this.http.get<ApiResposne<any[]>>(url, { headers });
  }
}
