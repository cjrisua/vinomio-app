import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Variety } from '../models/Variety';

@Injectable({
  providedIn: 'root'
})
export class VinomioVarietyService {

  private apiUrl = environment.apiUrl + "/variety"
  count!: number;

  constructor(private httpClient: HttpClient) { }

  private map(result:{count:number, rows:Variety[]}): Variety[]{
    this.count = result.count;
    return result.rows
  }
  get(name?:string): Observable<Variety[]>{
    const query_params = !name && name == undefined ? [] : [`?name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    return this.httpClient.get<any>(`${this.apiUrl}${query_params}`).pipe(
      map(res => this.map(res))
    )
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
