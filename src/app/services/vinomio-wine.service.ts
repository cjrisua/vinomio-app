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

  getAll(): Observable<Wine[]>{
    return  this.httpClient.get<Wine[]>(this.apiUrl)
  }
  add(data:any){
    //console.log("data:" + data)
    return this.httpClient
      .post(this.apiUrl, data, {observe : 'response'})
  }
}
