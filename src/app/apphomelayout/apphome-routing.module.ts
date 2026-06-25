import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { ApphomelayoutComponent } from './apphomelayout.component';
import { ProfileComponent } from '../appinnerlayout/profile/profile.component';
import { StyleComponent } from '../appinnerlayout/style/style.component';
import { ReceivemoneyComponent } from './receivemoney/receivemoney.component';
import { BillsComponent } from './bills/bills.component';
import { SendmoneyComponent } from './sendmoney/sendmoney.component';
import { PayComponent } from './pay/pay.component';
import { RewardsComponent } from './rewards/rewards.component';
import { WalletComponent } from './wallet/wallet.component';
import { BlogComponent } from '../appinnerlayout/blog/blog.component';
import { BlogdetailsComponent } from '../appinnerlayout/blogdetails/blogdetails.component';
import { AlltransactionComponent } from './alltransaction/alltransaction.component';
import { AuthguardGuard } from '../authlayout/services/authguard.guard';
import { AddticketComponent } from './addticket/addticket.component';
import { SuccessComponent } from './success/success.component';
import { SubpromotersComponent } from './subpromoters/subpromoters.component';
import { AddpromoterComponent } from './subpromoters/addpromoter/addpromoter.component';
import { ViewtransactionComponent } from './alltransaction/viewtransaction/viewtransaction.component';
import { SubPromoterProfileComponent } from './sub-promoter-profile/sub-promoter-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClientviewtransactionComponent } from './alltransaction/clientviewtransaction/clientviewtransaction.component';
import { HomeResetPasswordComponent } from './home-reset-password/home-reset-password.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    component: ApphomelayoutComponent,
    canActivate: [AuthguardGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'pay',
        component: PayComponent,
      },
      {
        path: 'sendmoney',
        component: SendmoneyComponent,
      },
      {
        path: 'bills',
        component: BillsComponent,
      },
      {
        path: 'receivemoney',
        component: ReceivemoneyComponent,
      },
      {
        path: 'rewards',
        component: RewardsComponent,
      },
      {
        path: 'wallet',
        component: WalletComponent,
      },
      {
        path: 'style',
        component: StyleComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'blogdetails/:id',
        component: BlogdetailsComponent,
      },
      {
        path: 'alltransaction',
        component: AlltransactionComponent,
      },
      {
        path: 'addticket/:ticket',
        component: AddticketComponent,
      },
      {
        path: 'success',
        component: SuccessComponent,
      },
      {
        path: 'subpromoters',
        component: SubpromotersComponent,
      },
      {
        path: 'addpromoter',
        component: AddpromoterComponent,
      },
      {
        path: 'viewtransaction/:id',
        component: ViewtransactionComponent,
      },
      {
        path: 'clientviewtransaction/:id',
        component: ClientviewtransactionComponent,
      },
      {
        path: 'sub-promoter-profile/:id/:name',
        component: SubPromoterProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'homeresetpassword',
        component: HomeResetPasswordComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ApphomelayoutRoutingModule {}
