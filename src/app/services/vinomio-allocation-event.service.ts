import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry , EMPTY, skipWhile} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllocationEvent } from '../models/AllocationEvent';
import { VinomioBaseService } from './vinomio-base.service';

@Injectable({
  providedIn: 'root'
})
export class VinomioAllocationEventService {

  private apiUrl:string = environment.apiUrl + "/allocationevent"
  
  constructor(
    private http:HttpClient,
    private baseService:VinomioBaseService
    ) {
      baseService.apiUrl = this.apiUrl;
     }
  
  get(merchantId:number): Observable<AllocationEvent[]>{
    return this.http
            .get<AllocationEvent[]>(`${this.apiUrl}/merchant/${merchantId}`)
            //.pipe(
            //  skipWhile((data) => { //console.log("?:" + JSON.stringify(data)); return false}),
            //);
            //.pipe(
            //  map((res) => {alert(res); return res}),
            //  catchError(err => { alert(JSON.stringify(err)); return EMPTY; })
            //);
  }
  getByEvent(id:number){
    this.baseService.apiUrl = `${this.apiUrl}/${id}`
   return  this.baseService.get().pipe(map((p)=>p))
  }
  put(eventId:number, data:any){
    return this.http.put(this.apiUrl+"/"+eventId, data);
  }
}
