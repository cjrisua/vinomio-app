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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export enum MODEL {
  Producer = 'producer',
  Wine = 'wine'
}
