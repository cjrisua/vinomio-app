import { Injectable } from '@angular/core';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingDialogService {

  constructor() { }

  openDialog(): void {
    console.log("LoadingDialogService openDialog()")
  }
  hideDialog(): void {
    console.log("LoadingDialogService openDialog()")
  }
}
