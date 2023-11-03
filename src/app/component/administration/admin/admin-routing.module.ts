import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialManagementComponent } from '../../financial-management/financial-management.component';
import { OrderManagementComponent } from '../../order-management/order-management.component';
import { VendorManagementComponent } from '../../vendor-management/vendor-management.component';
import { UserManagementComponent } from '../../user-management/user-management.component';
import { SalesManagementComponent } from '../../sales-management/sales-management.component';
import { VendorProfileComponent } from '../../vendor-profile/vendor-profile.component';
import { FinancialManagementReportComponent } from '../../financial-management-report/financial-management-report.component';
import { SettingsManagementComponent } from '../../settings-management/settings-management.component';
import { NotAvailableComponent } from '../../not-available/not-available.component';
import { OrderDetailsComponent } from '../../order-details/order-details.component';
import { ProductComponent } from '../../product/product.component';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { AddProductComponent } from '../../add-product/add-product.component';
import { EditProductComponent } from '../../edit-product/edit-product.component';

const routes: Routes = [
  { path: 'financial', component: FinancialManagementComponent },
  { path: 'financial/:id/report', component: FinancialManagementReportComponent },
  { path: 'order', component: OrderManagementComponent },
  { path: 'order/:id/details', component: OrderDetailsComponent },
  { path: 'user', component: UserManagementComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id/details', component: ProductDetailsComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/:id/update', component: EditProductComponent },
  { path: 'vendor', component: VendorManagementComponent },
  { path: 'sales', component: SalesManagementComponent },
  { path: "vendor/:id/profile", component: VendorProfileComponent },
  { path: "settings", component: SettingsManagementComponent },
  { path: "**", component:NotAvailableComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
