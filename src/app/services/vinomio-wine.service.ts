import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producer } from '../models/Producer';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Wine } from '../models/Wine';
import { environment } from 'src/environments/environment';
import { VinomioBaseService } from './vinomio-base.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class VinomioWineService {
  private apiUrl = environment.apiUrl + '/wine';
  constructor(
    private httpClient: HttpClient,
    private baseService: VinomioBaseService
  ) {}
  count: number =0

  private map(result: { count: number; rows: Wine[] }): Wine[] {
    this.count = result.count;
    return result.rows;
  }
  getByWine(wineId:any){
      return this.baseService.get(this.apiUrl,{"id":wineId}).pipe(
        map((p) => { 
          this.count = this.baseService.count;
          return p})
          )
  }
  get(query?: { producerId?: number; name?: string }): Observable<any[]> {
    //console.debug(query)
    if (query?.name) {
      const query_params = [
        `name__iLike=${encodeURI((<string>query.name).trim())}`,
      ]
        .filter((p) => p.match('.+?=.+?'))
        .join('&');
      return this.httpClient
        .get<any>(`${this.apiUrl}?${query_params}`)
        .pipe(map((res) => this.map(res)));
    }
    if (query?.producerId)
      return this.httpClient
        .get<any>(`${this.apiUrl}?producerId=${query.producerId}`)
        .pipe(map((res) => this.map(res)));

    return this.httpClient
      .get<any>(this.apiUrl)
      .pipe(map((res) => this.map(res)));
  }
  put(id: any, data: any) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }
  add(data: any) {
    //console.log("data:" + data)
    return this.httpClient.post(this.apiUrl, data, { observe: 'response' });
  }
  delete(id: any) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
