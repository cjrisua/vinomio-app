import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tag } from '../models/Tag';
import { VinomioBaseService } from './vinomio-base.service';

@Injectable({
  providedIn: 'root'
})
export class VinomioTagService {

  private apiUrl = environment.apiUrl + '/tag';
  count: number | undefined;

  constructor( private baseService:VinomioBaseService) { }

  private get():Observable<Tag[]>{
    return this.baseService.get(this.apiUrl).pipe(
      map((p) => { 
        this.count = this.baseService.count;
        return p})
    )
  }
  getList():Observable<Tag[]>{
    return this.get()
  }
  delete(id:number){
    return this.baseService.delete(this.apiUrl,id).pipe(
      map((res)=>res),
      catchError((err)=>{console.error(err); return EMPTY})
    )
  }
}
