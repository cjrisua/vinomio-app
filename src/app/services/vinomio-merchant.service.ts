import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Merchant } from '../models/Merchant';

@Injectable({
  providedIn: 'root'
})
export class VinomioMerchantService {

  private apiUrl = environment.apiUrl + "/merchant"

  constructor(private http: HttpClient) { }

  get(userid:any,name:any="") : Observable<Merchant[]>{
    const query_params = [`userId=${userid}`,`name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    console.log(query_params)
    return this.http.get<Merchant[]>(`${this.apiUrl}?${query_params}`)
  }

  add(data:any){
    return this.http.post(`${this.apiUrl}`,data);
  }

  put(id:string, data:any){
    return this.http.put(`${this.apiUrl}/${id}`,data);
  }
}
