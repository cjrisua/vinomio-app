import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
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

  getAll(){
    return this.httpClient.get(this.apiUrl)
  }
  add(data:any){
    console.log(data.get('name'))
    return this.httpClient
      .post(this.apiUrl, data)
  }
}
