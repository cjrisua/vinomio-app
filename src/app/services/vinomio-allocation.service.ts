import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Allocation } from '../models/Allocation';
import { VinomioBaseService } from './vinomio-base.service';

@Injectable({
  providedIn: 'root'
})
export class VinomioAllocationService {

  private apiUrl = environment.apiUrl + "/allocation"
  count!: number;

  constructor(
    private http:HttpClient,
    private baseService:VinomioBaseService
    ) 
    { 
    }

  private map(result:{count:number, rows:Allocation[]}): Allocation[]{
    this.count = result.count;
    return result.rows
  }

  getById(id:number){
    return this.baseService.get( `${this.apiUrl}/${id}`).pipe(map((p)=>p))
  }
  getByCellarId(id:number){
    //this.baseService.apiUrl += "cellar"
  }
  get(userId:any, upcoming:boolean = false):Observable<Allocation[]>{
    if(upcoming)
      return this.http.get<any>(`${this.apiUrl}/events/${userId}`).pipe(map(res => this.map(res)))
    return this.http.get<any>(this.apiUrl).pipe(map(res => this.map(res)));
  }
  getLastPurchases(userId:any){
    //https://localhost:3000/api/allocation/cellar/3
    return this.http.get<any>(`${this.apiUrl}/cellar/${userId}`).pipe(map(res => this.map(res)))
  }
  add(data:any){
    //alert(JSON.stringify(data))
    return this.http
      .post(this.apiUrl, data, {observe : 'response'})
  }
  patch(id:number, data:any){
    return this.http
      .patch(`${this.apiUrl}/${id}`, data, {observe : 'response'})
  }
  delete(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`,{observe : 'response'})
  }
}
