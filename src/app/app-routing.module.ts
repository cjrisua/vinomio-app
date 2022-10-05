import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminProducersComponent } from './admin/admin-producers/admin-producers.component';
import { AdminWinesComponent } from './admin/admin-wines/admin-wines.component';
import { AdminProducersFormComponent } from './admin/admin-producers/admin-producers-form/admin-producers-form.component';
import { AddWineFormComponent } from './admin/admin-wines/add-wine-form/add-wine-form.component'
import { AdminCountryComponent } from './admin/admin-country/admin-country.component';
import { AdminRegionComponent } from './admin/admin-region/admin-region.component';
import { AdminCountryFormComponent } from './admin/admin-country/admin-country-form/admin-country-form.component';
import { AdminRegionFormComponent } from './admin/admin-region/admin-region-form/admin-region-form.component';
import { AdminVarietyFormComponent } from './admin/admin-variety/admin-variety-form/admin-variety-form.component';
import { AdminVarietyComponent } from './admin/admin-variety/admin-variety.component';
import { AdminMastervarietalComponent } from './admin/admin-mastervarietal/admin-mastervarietal.component';
import { AdminMastervarietalFormComponent } from './admin/admin-mastervarietal/admin-mastervarietal-form/admin-mastervarietal-form.component';
import { AdminVintageFormComponent } from './admin/admin-vintage/admin-vintage-form/admin-vintage-form.component';
import { AdminVintageComponent } from './admin/admin-vintage/admin-vintage.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { CellarDashboardComponent } from './cellar/cellar-dashboard/cellar-dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MainDashboardComponent } from './core/main-dashboard/main-dashboard.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { CellarAddWineComponent } from './cellar/cellar-add-wine/cellar-add-wine.component';
import { NavbarFormSignupComponent } from './core/navbar/navbar-form-signup/navbar-form-signup.component';
import { ProfileCellarAddFormComponent } from './profile/profile-cellar/profile-cellar-add-form/profile-cellar-add-form.component';
import { AdminCellarRoleComponent } from './admin/admin-cellar-role/admin-cellar-role.component';
import { AdminCellarRoleFormComponent } from './admin/admin-cellar-role/admin-cellar-role-form/admin-cellar-role-form.component';
import { CellarWineDetailComponent } from './cellar/cellar-wine-detail/cellar-wine-detail.component';
import { AllocationComponent } from './allocation/allocation.component';
import { WineReviewViewComponent } from './review/wine-review-view/wine-review-view.component';
import { WineSearchComponent } from './wine/wine-search/wine-search.component';
import { AllocationMerchantComponent } from './allocation/allocation-merchant/allocation-merchant.component';
import { CellarWineReviewComponent } from './cellar/cellar-wine-review/cellar-wine-review.component';
import { AdminReviewComponent } from './admin/admin-review/admin-review.component';
import { AdminPeopleComponent } from './admin/admin-people/admin-people.component';
import { AdminTagComponent } from './admin/admin-tag/admin-tag.component';
import { AdminPeopleFormComponent } from './admin/admin-people/admin-people-form/admin-people-form.component';


const routes: Routes = [
  {path:'login', component:AuthLoginComponent},
/*  
  
  {path:'profile', component:ProfileInfoComponent, canActivate: [AuthGuard] },
  {path:'profile/cellar/add', component:ProfileCellarAddFormComponent, canActivate: [AuthGuard] },
  {path:'signup', component:NavbarFormSignupComponent},
  {path:'cellar-wine-reviews', component:CellarDashboardWineReviewsComponent},*/
  {
    path:'admin',
    children:[
      {path:'', pathMatch:'full', component: AdminComponent},
      {path:'vintage', component:AdminVintageComponent},
      {path:'vintage/add', component:AdminVintageFormComponent},
      {path:'vintage/:id', component:AdminVintageFormComponent},
      {path:'producer', component:AdminProducersComponent},
      {path:'producer/:id', component:AdminProducersFormComponent},
      {path:'producer/add', component:AdminProducersFormComponent},
      {path:'wine', component:AdminWinesComponent},
      {path:'wine/add', component:AddWineFormComponent},
      {path:'wine/:id', component:AddWineFormComponent},
      {path:'country', component:AdminCountryComponent},
      {path:'country/:id', component:AdminCountryFormComponent},
      {path:'country/add', component:AdminCountryFormComponent},
      {path:'region', component:AdminRegionComponent},
      {path:'region/:id', component:AdminRegionFormComponent},
      {path:'region/add', component:AdminRegionFormComponent},
      {path:'role', component:AdminCellarRoleComponent},
      {path:'role/:id', component:AdminCellarRoleFormComponent},
      {path:'role/add', component:AdminCellarRoleFormComponent},
      {path:'variety', component:AdminVarietyComponent},
      {path:'variety/:id', component:AdminVarietyFormComponent},
      {path:'variety/add', component:AdminVarietyFormComponent},
      {path:'mastervarietal', component:AdminMastervarietalComponent},
      {path:'mastervarietal/:id', component:AdminMastervarietalFormComponent},
      {path:'mastervarietal/add', component:AdminMastervarietalFormComponent},
      {path:'review', component:AdminReviewComponent},
      {path:'people',
        children:[
          {path : '', pathMatch:'full',component:AdminPeopleComponent},
          {path:'add', component:AdminPeopleFormComponent}
        ]
      },
      {path:'tag', component:AdminTagComponent},
    ]
  },
  {
    path:'cellar', 
    canActivate: [AuthGuard],
    children:[
      {path : '', pathMatch:'full', component: CellarDashboardComponent},
      {path:'wine', component:CellarWineDetailComponent},
      {path:'wine-review', component:CellarWineReviewComponent }
    ]
  },
  {
    path:'allocation',
    canActivate: [AuthGuard],
    children:[
      {path:'',pathMatch:'full',component:AllocationComponent},
      {path:'merchant',pathMatch:'full',component:AllocationMerchantComponent}
    ]
  },
  {
    path:'review',
    children:[
      {path:'',pathMatch:'full',component:WineReviewViewComponent}]
  },
  {
    path:'search',
    children:[
      {path:'',pathMatch:'full',component:WineSearchComponent}]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
