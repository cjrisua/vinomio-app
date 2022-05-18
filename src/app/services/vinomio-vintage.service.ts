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
  count!: number;

  constructor(private httpClient: HttpClient) { }

  private map(result:{count:number, rows:Vintage[]}): Vintage[]{
    this.count = result.count;
    return result.rows
  }
  get(): Observable<Vintage[]>{
    return this.httpClient.get<any>(this.apiUrl).pipe(map(res => this.map(res)))
  }
  getByWineId(id:number): Observable<Vintage[]>{
    const results  = this.httpClient.get<any>(`${this.apiUrl}?wineId=${id}`).pipe(
      map(r => this.map(r)),
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
  //deleteVintage(slug:string,id:number){
  //  return this.httpClient.delete(`${this.apiUrl}/${slug}/${id}`)
  //}
}
