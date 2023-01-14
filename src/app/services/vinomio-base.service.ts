import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VinomioBaseService {
  count: number = 0;
  pages?: number;
  private isString = (a:any) => {console.log(typeof a); return typeof a == "string"}
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
      params = Object.keys(query)
      .filter(f => { 
        if(query[f]){
          var valueof:any = query[f].toString()
          return valueof.length > 0
        }
        return false
      })
      .map(i => `${i}=${encodeURI(this.isString(query[i]) ? query[i].trim() : query[i])}`).join("&")
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
