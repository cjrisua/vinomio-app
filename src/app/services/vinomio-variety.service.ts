import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Variety } from '../models/Variety';

@Injectable({
  providedIn: 'root'
})
export class VinomioVarietyService {

  private apiUrl = environment.apiUrl + "/variety"

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Variety[]>{

    return this.httpClient.get<Variety[]>(this.apiUrl)
  }
  add(data:any){
    return this.httpClient
    .post(this.apiUrl, data, {observe : 'response'})
  }
  delete(id:any){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
}
