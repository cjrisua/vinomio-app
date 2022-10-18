import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AdminProducersComponent } from './admin/admin-producers/admin-producers.component';
import { AdminWinesComponent } from './admin/admin-wines/admin-wines.component';
import { AdminProducersFormComponent } from './admin/admin-producers/admin-producers-form/admin-producers-form.component';
import { AddWineFormComponent } from './admin/admin-wines/add-wine-form/add-wine-form.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminCountryComponent } from './admin/admin-country/admin-country.component';
import { AdminCountryFormComponent } from './admin/admin-country/admin-country-form/admin-country-form.component';
import { AdminRegionComponent } from './admin/admin-region/admin-region.component';
import { AdminRegionFormComponent } from './admin/admin-region/admin-region-form/admin-region-form.component';
import { AdminMastervarietalComponent } from './admin/admin-mastervarietal/admin-mastervarietal.component';
import { AdminVarietyComponent } from './admin/admin-variety/admin-variety.component';
import { AdminVintageComponent } from './admin/admin-vintage/admin-vintage.component';
import { AdminVarietyFormComponent } from './admin/admin-variety/admin-variety-form/admin-variety-form.component';
import { AdminMastervarietalFormComponent } from './admin/admin-mastervarietal/admin-mastervarietal-form/admin-mastervarietal-form.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminVintageFormComponent } from './admin/admin-vintage/admin-vintage-form/admin-vintage-form.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { NavbarComponent } from './core/navbar/navbar.component';
import { CellarDashboardComponent, VintagesPipe } from './cellar/cellar-dashboard/cellar-dashboard.component';
import { MainDashboardComponent } from './core/main-dashboard/main-dashboard.component';
import { MainSearcherComponent } from './core/main-searcher/main-searcher.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { ProfileCellarComponent } from './profile/profile-cellar/profile-cellar.component';
import { CellarAddWineComponent } from './cellar/cellar-add-wine/cellar-add-wine.component';
import { MerchantDialogComponent } from './shared/merchant/merchant-dialog/merchant-dialog.component';
import { CellarAddBulkTableComponent } from './cellar/cellar-add-wine/cellar-add-bulk-table/cellar-add-bulk-table.component'
import { NavbarFormSignupComponent } from './core/navbar/navbar-form-signup/navbar-form-signup.component';
import { ProfileCellarAddFormComponent } from './profile/profile-cellar/profile-cellar-add-form/profile-cellar-add-form.component';
import { AllocationComponent } from './allocation/allocation.component';
import { AllocationEventItemComponent } from './allocation/allocation-event-item/allocation-event-item.component';
import { AllocationEventComponent } from './allocation/allocation-event/allocation-event.component';
import { AllocationMerchantComponent } from './allocation/allocation-merchant/allocation-merchant.component';
import { AllocationFormComponent } from './allocation/allocation-form/allocation-form.component';
import { AllocationViewComponent } from './allocation/allocation-view/allocation-view.component';
import { AllocationEventViewComponent } from './allocation/allocation-event-view/allocation-event-view.component';
import { AllocationMerchantFormComponent } from './allocation/allocation-merchant/allocation-merchant-form/allocation-merchant-form.component';
import { AllocationEventOfferComponent } from './allocation/allocation-event-offer/allocation-event-offer.component';
import { AdminOrderByPipe } from './admin-order-by.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModelTableComponent } from './core/admin-model-table/admin-model-table.component';
import { AdminModelSearcherComponent } from './core/admin-model-searcher/admin-model-searcher.component';
import { AdminCellarRoleComponent } from './admin/admin-cellar-role/admin-cellar-role.component';
import { AdminCellarRoleFormComponent } from './admin/admin-cellar-role/admin-cellar-role-form/admin-cellar-role-form.component';
import { CellarWineAllocationAddComponent } from './cellar/cellar-wine-allocation/cellar-wine-allocation-add/cellar-wine-allocation-add.component';
import { AllocationPurchaseComponent } from './allocation/allocation-purchase/allocation-purchase.component';
import { WineSearchComponent } from './wine/wine-search/wine-search.component';
import { WineReviewComponent } from './review/wine-review/wine-review.component';
import { WineMainComponent } from './wine/wine-main.component'
import { WineSearchAddComponent } from './wine/wine-search-add/wine-search-add.component';
import { CellarWineDetailComponent } from './cellar/cellar-wine-detail/cellar-wine-detail.component';
import { CellarWineAllocationEditComponent } from './cellar/cellar-wine-allocation/cellar-wine-allocation-edit/cellar-wine-allocation-edit.component';
import { CellarWineAllocationDeleteComponent } from './cellar/cellar-wine-allocation/cellar-wine-allocation-delete/cellar-wine-allocation-delete.component';
import { WineReviewViewComponent } from './review/wine-review-view/wine-review-view.component';
import { WineReviewListComponent } from './review/wine-review-list/wine-review-list.component';
import { Profile } from './models/Profile';
import { CellarWineReviewComponent } from './cellar/cellar-wine-review/cellar-wine-review.component';
import { AdminPeopleComponent } from './admin/admin-people/admin-people.component';
import { AdminPeopleFormComponent } from './admin/admin-people/admin-people-form/admin-people-form.component';
import { AdminReviewComponent } from './admin/admin-review/admin-review.component';
import { AdminReviewFormComponent } from './admin/admin-review/admin-review-form/admin-review-form.component';
import { WineSearchViewComponent } from './wine/wine-search-view/wine-search-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminProducersComponent,
    AdminWinesComponent,
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
    AdminPeopleComponent,
    AdminPeopleFormComponent,
    AdminReviewComponent,
    AdminReviewFormComponent,
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
    AllocationComponent,
    AllocationEventItemComponent,
    AllocationEventComponent,
    AllocationMerchantComponent,
    AllocationFormComponent,
    AllocationViewComponent,
    AllocationEventViewComponent,
    AllocationMerchantFormComponent,
    AllocationEventOfferComponent,
    AdminOrderByPipe,
    AdminModelTableComponent,
    AdminModelSearcherComponent,
    AdminCellarRoleComponent,
    AdminCellarRoleFormComponent,
    CellarWineAllocationAddComponent,
    AllocationPurchaseComponent,
    WineSearchComponent,
    WineReviewComponent,
    WineMainComponent,
    WineSearchViewComponent,
    WineSearchAddComponent,
    VintagesPipe,
    CellarWineDetailComponent,
    CellarWineAllocationDeleteComponent,
    CellarWineAllocationEditComponent,
    WineReviewViewComponent,
    WineReviewListComponent,
    CellarWineReviewComponent
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
  Role = 'role',
  People = 'people',
  Review = 'review',
  Tag = 'tag'
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
  DeleteWine = 'delete-wine',
  EditWine = 'edit-wine',
  Search = 'search-wine',
  WineDetail = 'wine-detail'
}
export class BaseCellar{

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
  Add ="Add",
  Edit ="Edit",
  List ="List"
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