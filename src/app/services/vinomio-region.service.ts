import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Region } from '../models/Region';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VinomioRegionService {

  private apiUrl = environment.apiUrl + "/region"
  count!: number;
  constructor(private httpClient: HttpClient) { 
  }
  private map(result:{count:number, rows:Region[]}): Region[]{
    this.count = result.count;
    return result.rows
  }
  
  get(IncludeTerroir:boolean = false, filterCountryId:number = -1, name?:string): Observable<Region[]>{
    
    let query:{includeparent?:boolean,countryId?:number,name__iLike?:string} = 
    {
      includeparent : IncludeTerroir
    }

    if(filterCountryId>=0)
      query.countryId = filterCountryId
      
    if(name !== undefined)
      query.name__iLike =`${encodeURI((<string>name).trim())}`

    const params:any[] = Object.entries(query).map((p) => `${p[0]}=${p[1]}`)
    return this.httpClient.get<any>(`${this.apiUrl}?${params.filter(p => p.match(".+?\=.+?")).join("&")}`).pipe(map(res => this.map(res)))
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
