import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VinomioAllocationService {

  private apiUrl = environment.apiUrl + "/allocation"

  constructor(private http:HttpClient) { }

  add(data:any){
    //alert(JSON.stringify(data))
    return this.http
      .post(this.apiUrl, data, {observe : 'response'})
  }
}
