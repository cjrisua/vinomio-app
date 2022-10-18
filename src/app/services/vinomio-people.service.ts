import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { People } from '../models/People';
import { VinomioBaseService } from './vinomio-base.service';

@Injectable({
  providedIn: 'root',
})
export class VinomioPeopleService {
  private apiUrl = environment.apiUrl + '/people';
  public count?:number;

  constructor(private baseService: VinomioBaseService) {
  }
  private get(filter?:{}):Observable<any>{
    return this.baseService.get(this.apiUrl,filter).pipe(
      map((p) => { 
        this.count = this.baseService.count;
        return p})
    )
  }
  getList(){
    return this.get()
  }
  getById(id:number){
    return this.get({"id":id}).pipe(
      map((p)=>{
        console.log(p)
        return p})
    )
  }
  getByName(name:string){
    const query_params = {name__iLike:encodeURI((<string>name).trim())}
    return this.baseService.get(this.apiUrl,query_params).pipe(
      map((p)=>{
        console.log(p)
        return p})
    )
  }
  add(data:{name:string,role:string,handler:string}) {
    return this.baseService.add(this.apiUrl,data).pipe(
      map((res)=>res),
      catchError((err)=>{console.debug(err); return EMPTY})
    )
  }
  put(id:number,data:any) {
    return this.baseService.put(this.apiUrl,id,data).pipe(
      map((res)=>res),
      catchError((err)=>{console.debug(err); return EMPTY})
    )
  }
  delete(id:number) {
    return this.baseService.delete(this.apiUrl,id).pipe(
      map((res)=>res),
      catchError((err)=>{console.debug(err); return EMPTY})
    )
  }
}
