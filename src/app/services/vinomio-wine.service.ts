import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producer } from '../models/Producer';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wine } from '../models/Wine';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VinomioWineService {

  private apiUrl = environment.apiUrl + "/wine"
  constructor(private httpClient: HttpClient) { }

  get(producerId?:number, name?:string): Observable<any[]>{
    if(name){
      const query_params = [`name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
      return this.httpClient.get<Producer[]>(`${this.apiUrl}?${query_params}`)
    }
    if(producerId)
      return  this.httpClient.get<any[]>(`${this.apiUrl}?producerId=${producerId}`)
    return  this.httpClient.get<any[]>(this.apiUrl)
  }
  put(id:any, data:any){
    return this.httpClient.put(`${this.apiUrl}/${id}`,data);
  }
  add(data:any){
    //console.log("data:" + data)
    return this.httpClient
      .post(this.apiUrl, data, {observe : 'response'})
  }
  delete(id:any){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
}
