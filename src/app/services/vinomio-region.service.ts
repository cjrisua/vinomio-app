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

  get(IncludeTerroir:boolean = false, filterCountryId:number = -1, name?:string): Observable<Region[]>{
    
    let paramdict:{includeparent?:boolean,countryId?:number,name__iLike?:string} = {
      includeparent : IncludeTerroir
    }

    if(filterCountryId>=0)
      paramdict.countryId = filterCountryId
      
    if(name !== undefined)
      paramdict.name__iLike =`${encodeURI((<string>name).trim())}`

    const params:any[] = Object.entries(paramdict).map((p) => `${p[0]}=${p[1]}`)
    /*
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
    */
    //const query_params = !name && name == undefined ? [] : [`?name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    return this.httpClient.get<Region[]>(`${this.apiUrl}?${params.filter(p => p.match(".+?\=.+?")).join("&")}`)
  }
  add(data:any){
    //console.log("data:" + data)
    return this.httpClient
      .post(this.apiUrl, data, {observe : 'response'})
  }
  delete(id:any){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
  put(id:any, data:any){
    return this.httpClient.put(`${this.apiUrl}/${id}`,data);
  }
}
