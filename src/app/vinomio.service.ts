import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VinomioService {

  private REST_API_SERVER = "http://minikahda-nas.fios-router.home:3000/api";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(endpoint:string){
    return this.httpClient.get(this.REST_API_SERVER+"/"+endpoint);
  }
   public getAll(){
     return this.httpClient.get
   }
}
