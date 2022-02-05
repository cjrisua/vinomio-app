import { NgModule } from '@angular/core';
import { LoadingDialogComponent } from './loading/loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from './errors/error-dialog/error-dialog.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorDialogService } from './errors/error-dialog.service';
import { LoadingDialogService } from './loading/loading-dialog.service';
import { MaterialModule } from '../material.module';
import { AllocationDialogAddComponent } from './allocation/allocation-dialog-add/allocation-dialog-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const sharedComponents = [LoadingDialogComponent, ErrorDialogComponent, AllocationDialogAddComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    RouterModule, 
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...sharedComponents],
  providers: [ErrorDialogService, LoadingDialogService],
  entryComponents: [...sharedComponents]
})
export class SharedModule { }
