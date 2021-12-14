import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import {MatIconModule} from '@angular/material/icon';
import { AdminVintageFormComponent } from './admin-vintage/admin-vintage-form/admin-vintage-form.component';


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
    AdminVintageFormComponent
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
  ],
  providers: [],
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
