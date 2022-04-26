import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
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
  constructor(private httpClient: HttpClient) { }

  get(name:string="") : Observable<Producer[]>{
    const query_params = [`name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    //console.log(query_params)
    return this.httpClient.get<Producer[]>(`${this.apiUrl}?${query_params}`)
  }
  add(data:any){
    //console.log("data:" + data)
    return this.httpClient
      .post(this.apiUrl, data, {observe : 'response'})
  }
}
