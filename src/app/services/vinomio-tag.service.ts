import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { VinomioBaseService } from './vinomio-base.service';

@Injectable({
  providedIn: 'root'
})
export class VinomioTagService {

  private apiUrl = environment.apiUrl + '/tag';
  count: number | undefined;

  constructor( private baseService:VinomioBaseService) { }

  get(){
    return this.baseService.get(this.apiUrl).pipe(
      map((p) => { 
        this.count = this.baseService.count;
        return p})
    )
  }
  getList(){
    this.get()
  }
}
