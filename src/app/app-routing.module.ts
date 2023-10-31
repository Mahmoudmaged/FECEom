import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './component/administration/administration.component';


const routes: Routes = [
  { path: "admin", component: AdministrationComponent },

  // { path: "admin", canActivate: [AuthGuard], component: AdminComponent },
  // {path:"**" , component:NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
