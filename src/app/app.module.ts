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
import { UserManagmentComponent } from './component/user-managment/user-managment.component';
import { SalesManagementComponent } from './component/sales-management/sales-management.component';
import { FinancialManagementComponent } from './component/financial-management/financial-management.component';
import { SettingsManagementComponent } from './component/settings-management/settings-management.component';
import { CalendarModule } from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NgApexchartsModule} from 'ng-apexcharts';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
@NgModule({
  declarations: [
    AppComponent,
    AdministrationComponent,
    OrderManagementComponent,
    VendorManagementComponent,
    UserManagmentComponent,
    SalesManagementComponent,
    FinancialManagementComponent,
    SettingsManagementComponent,
    AdminLoginComponent
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
