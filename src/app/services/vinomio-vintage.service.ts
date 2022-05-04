import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, isObservable, map, observable, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vintage } from '../models/Vintage';

@Injectable({
  providedIn: 'root'
})
export class VinomioVintageService {

  private apiUrl = environment.apiUrl + "/vintage"

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Vintage[]>{
    return this.httpClient.get<Vintage[]>(this.apiUrl)
  }
  getByWineId(id:number): Observable<Vintage[]>{
    const results  = this.httpClient.get<Vintage[]>(`${this.apiUrl}?wineId=${id}`).pipe(
      map((r) => {return r}),
      catchError((val)=> of([]))
    )
    return results
  }
  add(data:any){
    return this.httpClient
    .post(this.apiUrl, data, {observe : 'response'})
  }
  delete(id:any){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
}
