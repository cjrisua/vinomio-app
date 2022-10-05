import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VinomioPeopleService {

  private apiUrl = environment.apiUrl + "/people"

  constructor(private http: HttpClient) { }

  get(name?:string){
    //const query_params = [`userId=${userid}`,`name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    //console.log(query_params)
    //return this.http.get<Merchant[]>(`${this.apiUrl}?${query_params}`)
    return this.http.get<any>(`${this.apiUrl}`)
  }
  add(){}
  put(){}
  delete(){}
}
