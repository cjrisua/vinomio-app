import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingDialogService } from '../../shared/loading/loading-dialog.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private loadingDialogService: LoadingDialogService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.debug(`Request [${request.method}]: + ${request.url} ${JSON.stringify(request.body)}`)
    //this.loadingDialogService.openDialog();
    return next.handle(request).pipe(
      finalize(() => {
        //this.loadingDialogService.hideDialog();
      })
    ) as Observable<HttpEvent<unknown>>;
  }
}