import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Allocation } from '../models/Allocation';

@Injectable({
  providedIn: 'root'
})
export class VinomioAllocationService {

  private apiUrl = environment.apiUrl + "/allocation"

  constructor(private http:HttpClient) { }

  get(userId:any, upcoming:boolean = false):Observable<Allocation[]>{
    if(upcoming)
      return this.http.get<Allocation[]>(`${this.apiUrl}/events/${userId}`);
    return this.http.get<Allocation[]>(this.apiUrl);
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
}
