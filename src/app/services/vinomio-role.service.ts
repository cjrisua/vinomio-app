import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class VinomioRoleService {
  
  private apiUrl = environment.apiUrl + "/role"
  count: number = 0;

  constructor(
    private http: HttpClient
  ) { }
  private map(result:{count:number, rows:Role[]}): Role[]{
    this.count = result.count;
    return result.rows
  }
  get(name?:string):Observable<Role[]>{
    //const query_params = [`name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    //return this.http.get<any>(`${this.apiUrl}?${query_params}`).pipe(map(r => this.map(r)))
    return this.http.get<any>(`${this.apiUrl}`).pipe(map(r => this.map(r)))
  }
  put(id:any, data:any){
    return this.http.put(`${this.apiUrl}/${id}`,data);
  }
  delete(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  add(data:any){
    return this.http
      .post(this.apiUrl, data, {observe : 'response'})
  }
}
