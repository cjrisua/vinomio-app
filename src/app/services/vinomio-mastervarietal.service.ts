import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MasterVarietal } from '../models/MasterVarietal';

@Injectable({
  providedIn: 'root'
})
export class VinomioMastervarietalService {

  private apiUrl = environment.apiUrl + "/mastervarietal"

  constructor(private httpClient: HttpClient) { }

  get(name?:string): Observable<MasterVarietal[]>{
    const query_params = !name && name == undefined ? [] : [`?name__iLike=${encodeURI((<string>name).trim())}`].filter(p => p.match(".+?\=.+?")).join("&")
    return this.httpClient.get<MasterVarietal[]>(`${this.apiUrl}${query_params}`)
  }
  add(data:any){
    return this.httpClient
    .post(this.apiUrl, data, {observe : 'response'})
  }
  delete(id:any){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
  deleteVariety(slug:string, varietyId:number){
    return this.httpClient.delete(`${this.apiUrl}/${slug}/${varietyId}`)
  }
  put(id:any, data:any){
    return this.httpClient.put(`${this.apiUrl}/${id}`,data);
  }
}
