import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cellar } from '../models/Cellar';

@Injectable({
  providedIn: 'root'
})
export class VinomioCellarService {

  private apiUrl = environment.apiUrl + "/cellar"

  constructor(private httpClient: HttpClient) { }

  get(id:number) : Observable<Cellar>{
    return this.httpClient.get<Cellar>(`${this.apiUrl}/${id}`)
  }

  add(data:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data);
  }
  put(id:number, data:any){
    return this.httpClient.put(`${this.apiUrl}/${id}`,data,  {observe : 'response'})
  }
}
