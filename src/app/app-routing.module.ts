import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminProducersComponent } from './admin-producers/admin-producers.component';
import { AdminWinesComponent } from './admin-wines/admin-wines.component';
import { AdminModelComponent } from './admin-model/admin-model.component';
import { AdminProducersFormComponent } from './admin-producers/admin-producers-form/admin-producers-form.component';
import { AddWineFormComponent } from './admin-wines/add-wine-form/add-wine-form.component'

const routes: Routes = [
  {path:'admin', component:AdminComponent},
  {path:'admin/model', component:AdminModelComponent},
  {path:'admin/producers', component:AdminProducersComponent},
  {path:'admin/producer/add', component:AdminProducersFormComponent},
  {path:'admin/wines', component:AdminWinesComponent},
  {path:'admin/wine/add', component:AddWineFormComponent},
  {path:'', redirectTo:'/admin', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
