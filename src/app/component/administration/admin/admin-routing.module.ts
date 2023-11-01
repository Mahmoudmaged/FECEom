import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialManagementComponent } from '../../financial-management/financial-management.component';
import { OrderManagementComponent } from '../../order-management/order-management.component';
import { VendorManagementComponent } from '../../vendor-management/vendor-management.component';
import { UserManagementComponent } from '../../user-management/user-management.component';
import { SalesManagementComponent } from '../../sales-management/sales-management.component';
import { VendorProfileComponent } from '../../vendor-profile/vendor-profile.component';
import { FinancialManagementReportComponent } from '../../financial-management-report/financial-management-report.component';

const routes: Routes = [
  { path: 'financial', component: FinancialManagementComponent },
  { path: 'financial/:id/report', component: FinancialManagementReportComponent },
  { path: 'order', component: OrderManagementComponent },
  { path: 'user', component: UserManagementComponent },
  { path: 'vendor', component: VendorManagementComponent },
  { path: 'sales', component: SalesManagementComponent },
  { path: "vendor/:id/profile", component: VendorProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
