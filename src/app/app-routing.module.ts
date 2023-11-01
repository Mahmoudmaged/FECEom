import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './component/administration/administration.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: "admin",
    // canActivate: [AuthGuard],
    component:AdministrationComponent,
    loadChildren: () => import('./component/administration/admin/admin.module').then(mod=>mod.AdminModule)
  },
  { path: "login", component: AdminLoginComponent },

  // { path: "admin", canActivate: [AuthGuard], component: AdminComponent },
  // {path:"**" , component:NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
