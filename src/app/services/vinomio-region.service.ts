import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Region } from '../models/Region';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VinomioRegionService {

  private apiUrl = environment.apiUrl + "/region"
  constructor(private httpClient: HttpClient) { 
  }

  get(IncludeTerroir:boolean = false, filterCountryId:number = -1): Observable<Region[]>{
    let params!:HttpParams;

    if(filterCountryId >= 0){
      params = new HttpParams()
        .set('includeparent', IncludeTerroir)
        .set('countryId', filterCountryId)
    }
    else{
      params = new HttpParams()
      .set('includeparent', IncludeTerroir)
    }

    return this.httpClient.get<Region[]>(this.apiUrl,{params})
  }
  add(data:any){
    //console.log("data:" + data)
    return this.httpClient
      .post(this.apiUrl, data, {observe : 'response'})
  }
}
