import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InvoicesComponent} from './invoices/invoices.component';
import {PayInvoiceComponent} from './invoices/pay-invoice/pay-invoice.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'vendors', pathMatch: 'full'},

  // Feature Modules
  {
    path: 'vendors',
    loadChildren: () =>
      import('./vendors/vendors.module').then((m) => m.VendorsModule),
    canActivate: []
  },
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: 'invoices/pay/:id',
    component: PayInvoiceComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'vendors'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
