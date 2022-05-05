import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllocationEventOffer } from '../models/AllocationEventOffer';

@Injectable({
  providedIn: 'root'
})
export class VinomioAllocationEventOfferService {

  private apiUrl = environment.apiUrl + "/allocationeventoffer"

  constructor(private http:HttpClient) { }

  getByEvent(eventid:any): Observable<AllocationEventOffer[]>{
    return this.http.get<AllocationEventOffer[]>(`${this.apiUrl}?allocationEventId=${eventid}`)
  }
  add(data:any){
    console.debug(data)
    return this.http.post(`${this.apiUrl}`,data)
  }
  delete(id:any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
