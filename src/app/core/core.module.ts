import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { HttpLoadingInterceptor } from './errors/http-loading.interceptor';
import { CoreAreaTextboxComponent } from './core-area-textbox/core-area-textbox.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

const sharedComponents = [CoreAreaTextboxComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [...sharedComponents],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...sharedComponents]
})
export class CoreModule {}