import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import {Observable} from "rxjs";
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class VinomioCountryService {

  private apiUrl = environment.apiUrl + "/country"
  
  constructor(private httpClient: HttpClient) { }

  get() : Observable<Country[]>{
    return this.httpClient.get<Country[]>(this.apiUrl)
  }
  add(data:any){
    //console.log("data:" + data)
    return this.httpClient
      .post(this.apiUrl, data, {observe : 'response'})
  }
}
