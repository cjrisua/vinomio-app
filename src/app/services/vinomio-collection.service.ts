import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Collection } from '../models/Collection';

@Injectable({
  providedIn: 'root'
})
export class VinomioCollectionService {

  private apiUrl = environment.apiUrl + "/collection"

  constructor(private httpClient: HttpClient) { }

  get() : Observable<Collection[]>{
    return this.httpClient.get<Collection[]>(this.apiUrl)
  }

  getCollection(cellarid:any,filter?:any) : Observable<Collection[]>{
    let params:any=""
    if(filter)
       params = Object.keys(filter).filter(f => filter[f]).map(i => `${i}=${encodeURI(filter[i].trim())}`).join("&")
    return this.httpClient.get<Collection[]>(`${this.apiUrl}?cellarId=${cellarid}`+(params.length > 0 ? `&${params}`:''))
    .pipe(
      map((res: Collection[]) => {
        return res || []
      }),
      catchError(()=> of([])))
  }
  getCollectionByWineId(cellarId:any,wineId:any){
    return this.httpClient.post<Collection[]>(`${this.apiUrl}/wine/${wineId}`,{cellarId:cellarId})
  }

  add(data:any){
    //console.log(data)
    return this.httpClient
      .post(this.apiUrl, data, {observe : 'response'})
  }
  delete(id:number){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
  put(id:number, data:any){
    return this.httpClient.put(`${this.apiUrl}/${id}`,data,  {observe : 'response'})
  }
}
