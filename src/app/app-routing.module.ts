import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/auth/auth.guard';
import {InvoicesComponent} from './invoices/invoices.component';
import {PayInvoiceComponent} from './invoices/pay-invoice/pay-invoice.component';
import {ViewInvoiceComponent} from './invoices/view-invoice/view-invoice.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'invoices', pathMatch: 'full'},

  // Feature Modules
  {
    path: 'vendors',
    loadChildren: () =>
      import('./vendors/vendors.module').then((m) => m.VendorsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invoices/pay/:id',
    component: PayInvoiceComponent
  },
  {
    path: 'invoices/view/:id',
    component: ViewInvoiceComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'invoices'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
