import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { People } from '../models/People';
import { VinomioBaseService } from './vinomio-base.service';
import { plainToClass } from 'class-transformer';
import { Review } from '../models/Review';
import { AuthService } from './auth.service';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class VinomioReviewService {
  private apiUrl = environment.apiUrl + '/review';
  private profile!: Profile
  public count!:number;

  constructor(
    private baseService: VinomioBaseService,
    private authService: AuthService
    ) { 
      this.profile = this.authService.getCurrentUser()
  }
  private get(filter?:any):Observable<any>{
    return this.baseService.get(this.apiUrl,filter).pipe(
      map(res => {
        this.count = this.baseService.count;
        return res
      })
    )
  }
  getList(filter?:{}):Observable<any>{
    return this.get(filter)
  }
  getById(reviewId:number):Observable<any>{
    return this.baseService.get(`${this.apiUrl}?id=${reviewId}`).pipe(
      map(p => {
        this.count = this.baseService.count;
        const serialized:Review[] = p.map((r:any) => plainToClass(Review,r,{excludeExtraneousValues: true}))
        return serialized[0]
      }),
      catchError((exception)=> EMPTY)
    )
  }
  getListByWine(wineId:number,filter?:{cellarId:number}){
    return this.baseService.get(`${this.apiUrl}/wine/${wineId}`, filter).pipe(
      map((p) => { 
        this.count = this.baseService.count;
        const serialized:Review[] = p.map((r:any) => plainToClass(Review,r,{excludeExtraneousValues: true}))
        return serialized})
    )
  }
  add(data:{}){
    return this.baseService.add(this.apiUrl,data).pipe(
      map((res)=>res),
      catchError((err)=>{console.error(err); return EMPTY})
    )
  }
  update(id:number,data:{}){
    return this.baseService.put(this.apiUrl,id,data).pipe(
      map((res)=>res),
      catchError((err)=>{console.error(err); return EMPTY})
    )
  }
  delete(id:number) {
    return this.baseService.delete(this.apiUrl,id).pipe(
      map((res)=>res),
      catchError((err)=>{console.error(err); return EMPTY})
    )
  }
}
