import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { QRCodeModule } from 'angularx-qrcode';

import { CustomerlayoutRoutingModule } from './customer-routing.module';
import { CustomerlayoutComponent } from './customerlayout.component';
import { CustomerSidebarComponent } from './partials/customer-sidebar/customer-sidebar.component';
import { CustomerHeadermenuComponent } from './partials/customer-headermenu/customer-headermenu.component';
import { CustomerStaticfooterComponent } from './partials/customer-staticfooter/customer-staticfooter.component';
import { CustomerSigninComponent } from './auth/customer-signin/customer-signin.component';
import { CustomerSignupComponent } from './auth/customer-signup/customer-signup.component';
import { CustomerHomeComponent } from './home/customer-home.component';
import { CustomerEventDetailComponent } from './event-detail/customer-event-detail.component';
import { CustomerBookingFormComponent } from './booking-form/customer-booking-form.component';
import { CustomerPaymentSuccessComponent } from './payment-success/customer-payment-success.component';
import { CustomerMyOrdersComponent } from './my-orders/customer-my-orders.component';

@NgModule({
  declarations: [
    CustomerlayoutComponent,
    CustomerSidebarComponent,
    CustomerHeadermenuComponent,
    CustomerStaticfooterComponent,
    CustomerSigninComponent,
    CustomerSignupComponent,
    CustomerHomeComponent,
    CustomerEventDetailComponent,
    CustomerBookingFormComponent,
    CustomerPaymentSuccessComponent,
    CustomerMyOrdersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwiperModule,
    QRCodeModule,
    CustomerlayoutRoutingModule
  ],
  exports: [
    CustomerlayoutComponent
  ]
})
export class CustomerModule { }
