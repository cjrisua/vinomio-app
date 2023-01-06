import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VinomioBaseService {
  count: number = 0;
  pages?: number;
  constructor(private http: HttpClient) {
    //console.log(">>>" + this.apiUrl)
  }

  private map(result: { count: number; pages: number; rows: any[] }): any[] {
    this.pages = result.pages | 0;
    this.count = result.count | 0;
    return result.rows?  result.rows : <any>result;
  }
  get(apiURL:string, query?:any): Observable<any> {
      
    let params="";
    if (query){
      //params = Object.entries(query)
      //  .map((p) => `${p[0]}=${p[1]}`)
      //  .filter((p) => p.match('.+?=.+?'))
      //  .join('&');
      params = Object.keys(query)
      .filter(f => query[f] &&  query[f].trim().length > 0)
      .map(i => `${i}=${encodeURI(query[i].trim())}`).join("&")
      params = params? `?${params}`: ""
    }
    console.debug(`${apiURL}${params}`);
    return this.http.get<any>(`${apiURL}${params}`).pipe(map((res) => this.map(res)));
  }
  add(apiURL:string,data: any) {
    return this.http.post(apiURL, data, { observe: 'response' });
  }
  delete(apiURL:string,id: number) {
    return this.http.delete(`${apiURL}/${id}`);
  }
  put(apiURL:string,id: number, data: any) {
    return this.http.put(`${apiURL}/${id}`, data);
  }
}
