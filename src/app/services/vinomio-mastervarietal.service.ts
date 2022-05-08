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

  get(): Observable<MasterVarietal[]>{
    return this.httpClient.get<MasterVarietal[]>(this.apiUrl)
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
