import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry , EMPTY, skipWhile} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllocationEvent } from '../models/AllocationEvent';

@Injectable({
  providedIn: 'root'
})
export class VinomioAllocationEventService {

  private apiUrl = environment.apiUrl + "/allocationevent"
  
  constructor(private http:HttpClient) { }

  get(MerchantId:number): Observable<AllocationEvent[]>{
    return this.http
            .get<AllocationEvent[]>(`${this.apiUrl}/merchant/${MerchantId}`)
            //.pipe(
            //  skipWhile((data) => { //console.log("?:" + JSON.stringify(data)); return false}),
            //);
            //.pipe(
            //  map((res) => {alert(res); return res}),
            //  catchError(err => { alert(JSON.stringify(err)); return EMPTY; })
            //);
  }
}