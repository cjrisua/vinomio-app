import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Collection } from '../models/Collection';

@Injectable({
  providedIn: 'root'
})
export class VinomioCollectionService {

  private apiUrl = environment.apiUrl + "/collection"

  constructor(private httpClient: HttpClient) { }

  get() : Observable<Collection[]>{
    return this.httpClient.get<Collection[]>(this.apiUrl)
  }

  getCollection(id:any) : Observable<Collection[]>{
    return this.httpClient.get<Collection[]>(`${this.apiUrl}?cellarId=${id}`)
    .pipe(
      map((res: Collection[]) => {
        return res || []
      }),
      catchError(()=> of([])))
  }

  add(data:any){
    return this.httpClient
      .post(this.apiUrl, data, {observe : 'response'})
  }
}
