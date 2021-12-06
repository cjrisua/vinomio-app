import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producer } from '../models/Producer';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VinomioWineService {

  private REST_API_SERVER = "http://minikahda-nas.fios-router.home:3000/api";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return  this.httpClient.get(this.REST_API_SERVER + "/wine")
  }
}
