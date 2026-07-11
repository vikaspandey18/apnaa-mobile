import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerlayoutComponent } from './customerlayout.component';
import { CustomerSigninComponent } from './auth/customer-signin/customer-signin.component';
import { CustomerSignupComponent } from './auth/customer-signup/customer-signup.component';
import { CustomerHomeComponent } from './home/customer-home.component';
import { CustomerEventDetailComponent } from './event-detail/customer-event-detail.component';
import { CustomerBookingFormComponent } from './booking-form/customer-booking-form.component';
import { CustomerPaymentSuccessComponent } from './payment-success/customer-payment-success.component';
import { CustomerMyOrdersComponent } from './my-orders/customer-my-orders.component';
import { CustomerService } from 'src/app/services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGuard implements CanActivate {
  constructor(private customerService: CustomerService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.customerService.customerId) {
      return true;
    }
    this.router.navigate(['/customer/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

const routes: Routes = [
  {
    path: 'customer/login',
    component: CustomerSigninComponent
  },
  {
    path: 'customer/register',
    component: CustomerSignupComponent
  },
  {
    path: 'customer',
    component: CustomerlayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: CustomerHomeComponent
      },
      {
        path: 'event/:id',
        component: CustomerEventDetailComponent
      },
      {
        path: 'book/:eventId',
        component: CustomerBookingFormComponent,
        canActivate: [CustomerAuthGuard]
      },
      {
        path: 'payment-success/:bookingId',
        component: CustomerPaymentSuccessComponent,
        canActivate: [CustomerAuthGuard]
      },
      {
        path: 'my-orders',
        component: CustomerMyOrdersComponent,
        canActivate: [CustomerAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerlayoutRoutingModule {}
