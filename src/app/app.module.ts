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
import { CellarAllocationViewComponent } from './cellar-allocation/cellar-allocation-view/cellar-allocation-view.component';
import { CellarAllocationEventViewComponent } from './cellar-allocation/cellar-allocation-event-view/cellar-allocation-event-view.component';
import { CellarMerchantFormComponent } from './cellar-allocation/cellar-merchant-form/cellar-merchant-form.component';
import { CellarAllocationEventOfferComponent } from './cellar-allocation/cellar-allocation-event-offer/cellar-allocation-event-offer.component';
import { AdminOrderByPipe } from './admin-order-by.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModelTableComponent } from './core/admin-model-table/admin-model-table.component';
import { AdminModelSearcherComponent } from './core/admin-model-searcher/admin-model-searcher.component';
import { AdminCellarRoleComponent } from './admin-cellar-role/admin-cellar-role.component';
import { AdminCellarRoleFormComponent } from './admin-cellar-role/admin-cellar-role-form/admin-cellar-role-form.component';
import { CellarWineAllocationAddComponent } from './cellar-wine-allocation/cellar-wine-allocation-add/cellar-wine-allocation-add.component';
import { CellarAllocationPurchaseComponent } from './cellar-allocation/cellar-allocation-purchase/cellar-allocation-purchase.component';
import { WineSearchComponent } from './wine/wine-search/wine-search.component';
import { WineReviewComponent } from './review/wine-review/wine-review.component';
import { WineMainComponent } from './wine/wine-main.component'
import { WineSearchAddComponent } from './wine/wine-search-add/wine-search-add.component';
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
    CellarAllocationFormComponent,
    CellarAllocationViewComponent,
    CellarAllocationEventViewComponent,
    CellarMerchantFormComponent,
    CellarAllocationEventOfferComponent,
    AdminOrderByPipe,
    AdminModelTableComponent,
    AdminModelSearcherComponent,
    AdminCellarRoleComponent,
    AdminCellarRoleFormComponent,
    CellarWineAllocationAddComponent,
    CellarAllocationPurchaseComponent,
    WineSearchComponent,
    WineReviewComponent,
    WineMainComponent,
    WineSearchAddComponent
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
  Vintage = 'vintage',
  Role = 'role'
}
export enum DashboardItem{
  Dashboard ='dashboard',
  Cellar = 'cellar',
  Allocation = 'allocation',
  Profile = 'profile',
  Search = 'search',
  Reviews = 'reviews',
  None = 'none'
}
export enum CellarDashboardActiveRoute{
  Dashboard = 'dashboard',
  WineAllocation='wine-allocation',
  AddWine ='add-wine',
  DrunkWine = 'remove-wine',
  Search = 'search-wine'
}
export class UserEventAction{
  _action!:Action;
  _module!:Module;
  constructor(
    private action:Action,
    private module:Module
  ){
    this._action = action;
    this._module = module;
  }
  public get EnumAction(): typeof Action{
    return Action
  }
  public get Action(): Action{
    return this._action;
  } 
  public get EnumModule(): typeof Module{
    return Module
  }
  public get Module(): Module{
    return this._module;
  }
}
export enum Action{
  Add ='Add',
  Edit ='Edit',
  List ='List'
}
export enum Module{
  Merchant = 'Merchant',
  Allocation = 'Allocation',
  AllocationEvent = 'AllocationEvent',
  AllocationPurchase = 'AllocationPurchase',
  WineSearch = 'WineSearch'
}

export enum WineColor{
  Red = 'Red',
  White = 'White',
  Rose = 'Rosé'
}
export enum WineType{
  Red = 'Red',
  White = 'White',
  Rose = 'Rosé',
  Sparkling = 'Sparkling',
  Dessert = 'Dessert',
  Fortified ='Fortified'
}