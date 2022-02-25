import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AdminProducersComponent } from './admin-producers/admin-producers.component';
import { AdminWinesComponent } from './admin-wines/admin-wines.component';
import { AdminModelNavigationComponent } from './admin-model-navigation/admin-model-navigation.component';
import { AdminModelComponent } from './admin-model/admin-model.component';
import { AdminProducersFormComponent } from './admin-producers/admin-producers-form/admin-producers-form.component';
import { AddWineFormComponent } from './admin-wines/add-wine-form/add-wine-form.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminCountryComponent } from './admin-country/admin-country.component';
import { AdminCountryFormComponent } from './admin-country/admin-country-form/admin-country-form.component';
import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AdminRegionFormComponent } from './admin-region/admin-region-form/admin-region-form.component';
import { AdminMastervarietalComponent } from './admin-mastervarietal/admin-mastervarietal.component';
import { AdminVarietyComponent } from './admin-variety/admin-variety.component';
import { AdminVintageComponent } from './admin-vintage/admin-vintage.component';
import { AdminVarietyFormComponent } from './admin-variety/admin-variety-form/admin-variety-form.component';
import { AdminMastervarietalFormComponent } from './admin-mastervarietal/admin-mastervarietal-form/admin-mastervarietal-form.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminVintageFormComponent } from './admin-vintage/admin-vintage-form/admin-vintage-form.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { NavbarComponent } from './core/navbar/navbar.component';
import { CellarDashboardComponent } from './cellar-dashboard/cellar-dashboard.component';
import { MainDashboardComponent } from './core/main-dashboard/main-dashboard.component';
import { MainSearcherComponent } from './core/main-searcher/main-searcher.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { ProfileCellarComponent } from './profile/profile-cellar/profile-cellar.component';
import { CellarAddWineComponent } from './cellar-add-wine/cellar-add-wine.component';
import { MerchantDialogComponent } from './shared/merchant/merchant-dialog/merchant-dialog.component';
import { CellarAddBulkTableComponent } from './cellar-add-wine/cellar-add-bulk-table/cellar-add-bulk-table.component'
import { NavbarFormSignupComponent } from './core/navbar/navbar-form-signup/navbar-form-signup.component';
import { ProfileCellarAddFormComponent } from './profile/profile-cellar/profile-cellar-add-form/profile-cellar-add-form.component';
import { CellarAllocationComponent } from './cellar-allocation/cellar-allocation.component';
import { CellarAllocationEventItemComponent } from './cellar-allocation/cellar-allocation-event-item/cellar-allocation-event-item.component';
import { CellarAllocationEventComponent } from './cellar-allocation/cellar-allocation-event/cellar-allocation-event.component';
import { CellarAllocationMerchantComponent } from './cellar-allocation/cellar-allocation-merchant/cellar-allocation-merchant.component';
import { CellarAllocationFormComponent } from './cellar-allocation/cellar-allocation-form/cellar-allocation-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminProducersComponent,
    AdminWinesComponent,
    AdminModelNavigationComponent,
    AdminModelComponent,
    AddWineFormComponent,
    AdminProducersFormComponent,
    AdminCountryComponent,
    AdminCountryFormComponent,
    AdminRegionComponent,
    AdminVarietyComponent,
    AdminMastervarietalComponent,
    AdminVintageComponent,
    AdminRegionFormComponent,
    AdminVarietyComponent,
    AdminVarietyFormComponent,
    AdminMastervarietalFormComponent,
    AdminVintageFormComponent,
    AuthLoginComponent,
    NavbarComponent,
    CellarDashboardComponent,
    MainDashboardComponent,
    MainSearcherComponent,
    ProfileInfoComponent,
    ProfileCellarComponent,
    CellarAddWineComponent,
    MerchantDialogComponent,
    CellarAddBulkTableComponent,
    NavbarFormSignupComponent,
    ProfileCellarAddFormComponent,
    CellarAllocationComponent,
    CellarAllocationEventItemComponent,
    CellarAllocationEventComponent,
    CellarAllocationMerchantComponent,
    CellarAllocationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModule,
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export enum MODEL {
  Producer = 'producer',
  Wine = 'wine',
  Country = 'country',
  Region = 'region',
  Variety = 'variety',
  MasterVarietal ='mastervarietal',
  Vintage = 'vintage'
}
export enum DashboardItem{
  Dashboard ='dashboard',
  Cellar = 'cellar',
  Allocation = 'allocation',
  Profile = 'profile',
  WineLake = 'winelake',
  Reviews = 'reviews',
  None = 'none'
}
export enum CellarDashboardActiveRoute{
  Dashboard = 'dashboard',
  AddWine ='add-wine',
  DrunkWine = 'remove-wine',
  Search = 'search-wine'
}