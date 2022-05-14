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

  get(name?:string): Observable<Variety[]>{
    const query_params = !name && name == undefined ? [] : [`?name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    return this.httpClient.get<Variety[]>(`${this.apiUrl}${query_params}`)
  }
  add(data:any){
    return this.httpClient
    .post(this.apiUrl, data, {observe : 'response'})
  }
  delete(id:any){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
  put(id:any, data:any){
    return this.httpClient.put(`${this.apiUrl}/${id}`,data);
  }
}
