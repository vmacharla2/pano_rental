import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NewUserComponent } from './components/new-user/new-user.component';
import { HomeComponent } from './components/home/home.component';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { AddNewPropertyComponent } from './components/add-new-property/add-new-property.component';
import { ListAllPropertiesComponent } from './components/list-all-properties/list-all-properties.component';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { FilterLocationPipe } from './pipes/filter-location.pipe';
import { FilterPropertyTypePipe } from './pipes/filter-property-type.pipe';
import { FilterMinrentPipe } from './pipes/filter-minrent.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactOwnerComponent } from './components/contact-owner/contact-owner.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { PropertyContactRequestsComponent } from './components/property-contact-requests/property-contact-requests.component';
import { TenantsListComponent } from './components/tenants-list/tenants-list.component';
import { AddTenantComponent } from './components/add-tenant/add-tenant.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewUserComponent,
    HomeComponent,
    AddNewPropertyComponent,
    ListAllPropertiesComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    PropertyCardComponent,
    PropertyDetailsComponent,
    PropertyListComponent,
    FilterLocationPipe,
    FilterPropertyTypePipe,
    FilterMinrentPipe,
    DashboardComponent,
    ContactOwnerComponent,
    PropertyFormComponent,
    PropertyContactRequestsComponent,
    TenantsListComponent,
    AddTenantComponent,
    AdminComponent,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgMatSearchBarModule,
    IvyCarouselModule,
    FlashMessagesModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
