import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { OrderManagementComponent } from './component/order-management/order-management.component';
import { VendorManagementComponent } from './component/vendor-management/vendor-management.component';
import { from } from 'rxjs';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { SalesManagementComponent } from './component/sales-management/sales-management.component';
import { FinancialManagementComponent } from './component/financial-management/financial-management.component';
import { SettingsManagementComponent } from './component/settings-management/settings-management.component';
import { CalendarModule } from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NgApexchartsModule} from 'ng-apexcharts';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { VendorProfileComponent } from './component/vendor-profile/vendor-profile.component';
import { FinancialManagementReportComponent } from './component/financial-management-report/financial-management-report.component';
import { NotAvailableComponent } from './component/not-available/not-available.component';
import { VendorLoginComponent } from './component/vendor-login/vendor-login.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
@NgModule({
  declarations: [
    AppComponent,
    AdministrationComponent,
    OrderManagementComponent,
    VendorManagementComponent,
    UserManagementComponent,
    SalesManagementComponent,
    FinancialManagementComponent,
    SettingsManagementComponent,
    AdminLoginComponent,
    VendorProfileComponent,
    FinancialManagementReportComponent,
    NotAvailableComponent,
    VendorLoginComponent,
    OrderDetailsComponent,
    ProductComponent,
    ProductDetailsComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
