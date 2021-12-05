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
import { AddProducerComponent } from './admin-producers/add-producer/add-producer.component';
import { AddWineFormComponent } from './admin-wines/add-wine-form/add-wine-form.component';
import { ConfigComponent } from './config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminProducersComponent,
    AdminWinesComponent,
    AdminModelNavigationComponent,
    AdminModelComponent,
    AddProducerComponent,
    AddWineFormComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export enum MODEL {
  Producer = 'producer',
  Wine = 'wine'
}
