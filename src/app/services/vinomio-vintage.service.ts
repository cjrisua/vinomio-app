import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, isObservable, map, observable, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vintage } from '../models/Vintage';
import { VinomioBaseService } from './vinomio-base.service';

@Injectable({
  providedIn: 'root'
})
export class VinomioVintageService {

  private apiUrl = environment.apiUrl + "/vintage"
  count!: number;

  constructor(
    private httpClient: HttpClient,
    private baseService: VinomioBaseService
    ) { }

  private map(result:{count:number, rows:Vintage[]}): Vintage[]{
    this.count = result.count;
    return result.rows
  }
  get(): Observable<Vintage[]>{
    return this.httpClient.get<any>(this.apiUrl).pipe(map(res => this.map(res)))
  }
  getByVintageId(id:any): Observable<Vintage[]>{
    return this.baseService.get(`${this.apiUrl}`,{id:id}).pipe(
      map((p) => { 
        this.count = this.baseService.count;
        return p})
    )
  }
  getByWineId(id:number): Observable<Vintage[]>{
    const results  = this.httpClient.get<any>(`${this.apiUrl}?wineId=${id}`).pipe(
      map(r => this.map(r)),
      catchError((val)=> of([]))
    )
    return results
  }
  getByWineName(name:string): Observable<Vintage[]>{
    const query_params = [`wine__name=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    return this.httpClient.get<any>(`${this.apiUrl}?${query_params}`).pipe(map(res => this.map(res)))
  }
  add(data: { wineId?: number; year?: any;}){
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
