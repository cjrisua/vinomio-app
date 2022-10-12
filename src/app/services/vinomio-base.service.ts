import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VinomioBaseService {
  count?: number;
  pages?: number;
  apiUrl!: string;
  constructor(private http: HttpClient) {}

  private map(result: { count: number; pages: number; rows: any[] }): any[] {
    this.pages = result.pages | 0;
    this.count = result.count | 0;
    return result.rows?  result.rows : <any>result;
  }
  get(query?: {}): Observable<any> {
    console.debug(this.apiUrl)
    let params="";
    if (query){
      params = Object.entries(query)
        .map((p) => `${p[0]}=${p[1]}`)
        .filter((p) => p.match('.+?=.+?'))
        .join('&');
      params = params? `?${params}`: ""
    }
    //console.debug(`${this.apiUrl}${params}`);
    return this.http.get<any>(`${this.apiUrl}${params}`).pipe(map((res) => this.map(res)));
  }
  add(data: any) {
    return this.http.post(this.apiUrl, data, { observe: 'response' });
  }
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  put(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
