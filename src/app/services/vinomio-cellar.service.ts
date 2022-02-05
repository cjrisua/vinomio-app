import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cellar } from '../models/Cellar';

@Injectable({
  providedIn: 'root'
})
export class VinomioCellarService {

  private apiUrl = environment.apiUrl + "/cellar"

  constructor(private httpClient: HttpClient) { }

  get(cellarid:number) : Observable<Cellar>{
    return this.httpClient.get<Cellar>(`${this.apiUrl}/${cellarid}`)
  }
}
