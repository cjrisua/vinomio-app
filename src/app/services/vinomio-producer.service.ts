import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import {Observable} from "rxjs";
import { Producer } from '../models/Producer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VinomioProducerService {

  private apiUrl = environment.apiUrl + "/producer"
  count!:number

  constructor(private httpClient: HttpClient) { }

  private map(result:{count:number, rows:Producer[]}): Producer[]{
    this.count = result.count;
    return result.rows
  }

  get(name?:string) : Observable<Producer[]>{
    const query_params = !name && name == undefined ? [] : [`name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    return this.httpClient.get<any>(`${this.apiUrl}?${query_params}`).pipe(map(res => this.map(res)))
  }
  add(data:any){
    //console.log("data:" + data)
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
