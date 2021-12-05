import { Injectable } from '@angular/core';
import { Wine } from "../models/Wine";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

const baseUrl = "http://minikahda-nas.fios-router.home:3000/api/wine";

@Injectable({
  providedIn: 'root'
})
export class VinomioWineService {

  constructor(private httpClient: HttpClient) { }

  public getAll(){
    return this.httpClient.get<Wine[]>(baseUrl);
  }
  public add(data:FormData){
    //return this.httpClient.post(baseUrl,data).pipe(
    //  catchError(this.)
    //);
  }
}
