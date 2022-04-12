import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddNewPropertyComponent } from './components/add-new-property/add-new-property.component';
import { AddTenantComponent } from './components/add-tenant/add-tenant.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import{NewUserComponent} from './components/new-user/new-user.component'
import { PropertyContactRequestsComponent } from './components/property-contact-requests/property-contact-requests.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { TenantsListComponent } from './components/tenants-list/tenants-list.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    component:HomeComponent
  },
 
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path:'signup',
    component:NewUserComponent
  },
  {
    path:'newproperty',
    component:AddNewPropertyComponent
  },
  {
    path:'propertydetails/:id',
    component:PropertyDetailsComponent
  },
  {
    path:'dashboard/:id',
    component:DashboardComponent,canActivate:[AuthGuard]
  },
  {
    path:'addnewproperty',
    component:AddNewPropertyComponent,canActivate:[AuthGuard]
  },
  {
    path:'propertycontactrequests',
    component:PropertyContactRequestsComponent,canActivate:[AuthGuard]
  },
  {
    path:'tenantslist',
    component:TenantsListComponent,canActivate:[AuthGuard]
  },
  {
    path:'addtenant',
    component:AddTenantComponent,canActivate:[AuthGuard]
  },
  {
    path:'admin',
    component:AdminComponent
  },

  { 
    path: '**', 
    redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
