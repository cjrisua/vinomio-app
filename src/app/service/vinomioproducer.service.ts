import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producer } from '../models/Producer';

const baseUrl = "http://minikahda-nas.fios-router.home:3000/api/producer";

@Injectable({
  providedIn: 'root'
})
export class VinomioProducerService {

  constructor(private httpClient: HttpClient) { }

  public getAll(){
    return this.httpClient.get<Producer[]>(baseUrl);
  }
}
