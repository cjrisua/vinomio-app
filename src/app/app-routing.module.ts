import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminProducersComponent } from './admin-producers/admin-producers.component';
import { AdminWinesComponent } from './admin-wines/admin-wines.component';
import { AdminModelComponent } from './admin-model/admin-model.component';
import { AdminProducersFormComponent } from './admin-producers/admin-producers-form/admin-producers-form.component';
import { AddWineFormComponent } from './admin-wines/add-wine-form/add-wine-form.component'
import { AdminCountryComponent } from './admin-country/admin-country.component';
import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AdminCountryFormComponent } from './admin-country/admin-country-form/admin-country-form.component';
import { AdminRegionFormComponent } from './admin-region/admin-region-form/admin-region-form.component';
import { AdminVarietyFormComponent } from './admin-variety/admin-variety-form/admin-variety-form.component';
import { AdminVarietyComponent } from './admin-variety/admin-variety.component';
import { AdminMastervarietalComponent } from './admin-mastervarietal/admin-mastervarietal.component';
import { AdminMastervarietalFormComponent } from './admin-mastervarietal/admin-mastervarietal-form/admin-mastervarietal-form.component';
import { AdminVintageFormComponent } from './admin-vintage/admin-vintage-form/admin-vintage-form.component';
import { AdminVintageComponent } from './admin-vintage/admin-vintage.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { CellarDashboardComponent } from './cellar-dashboard/cellar-dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MainDashboardComponent } from './core/main-dashboard/main-dashboard.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { CellarAddWineComponent } from './cellar-add-wine/cellar-add-wine.component';
import { NavbarFormSignupComponent } from './core/navbar/navbar-form-signup/navbar-form-signup.component';
import { ProfileCellarAddFormComponent } from './profile/profile-cellar/profile-cellar-add-form/profile-cellar-add-form.component';

const routes: Routes = [
  {path:'admin', component:AdminComponent},
  {path:'admin/model', component:AdminModelComponent},
  {path:'admin/producers', component:AdminProducersComponent},
  {path:'admin/producer/add', component:AdminProducersFormComponent},
  {path:'admin/wines', component:AdminWinesComponent},
  {path:'admin/wine/add', component:AddWineFormComponent},
  {path:'admin/country', component:AdminCountryComponent},
  {path:'admin/country/add', component:AdminCountryFormComponent},
  {path:'admin/region', component:AdminRegionComponent},
  {path:'admin/region/add', component:AdminRegionFormComponent},
  {path:'admin/variety', component:AdminVarietyComponent},
  {path:'admin/variety/add', component:AdminVarietyFormComponent},
  {path:'admin/mastervarietal', component:AdminMastervarietalComponent},
  {path:'admin/mastervarietal/add', component:AdminMastervarietalFormComponent},
  {path:'admin/vintage', component:AdminVintageComponent},
  {path:'admin/vintage/add', component:AdminVintageFormComponent},
  {path:'login', component:AuthLoginComponent},
  {path:'profile', component:ProfileInfoComponent, canActivate: [AuthGuard] },
  {path:'profile/cellar/add', component:ProfileCellarAddFormComponent, canActivate: [AuthGuard] },
  {path:'home', component:MainDashboardComponent, canActivate: [AuthGuard]},
  {path:'signup', component:NavbarFormSignupComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
