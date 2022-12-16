import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { Region } from '../../models/Region';
import { VinomioRegionService } from '../../services/vinomio-region.service';

@Component({
  selector: 'app-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent implements OnInit {

  modelName="Region"
  exclusionColumns=['country','regions','parent']
  dataSource = new MatTableDataSource<Region>();
  model$!: Observable<any>
  clearForm = new Subject()

  constructor(
    private router: Router,
    private regionService:VinomioRegionService
    ) { 
      this.model$ = this.regionService.get()
      .pipe(
        map((data:any[])=> this.dataSource.data = data),
        map(()=>this.modelName),
        catchError(()=>of([]))
      )
    }

  ngOnInit(): void {
    //this.getSourceData()
  }
  private getSourceData(text?:string){
    this.regionService.get(true,-1,text)
    .pipe(
      catchError(()=>of([]))
    )
    .subscribe(data => {
      this.dataSource.data = data;
      });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    console.log(`naviage to id ${JSON.stringify(wine.event)}`);
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/region/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.regionService.delete(wine.event.id).subscribe(() => {
        this.clearForm.next('')
        this.getSourceData()
      })
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.regionService.count}
  }
}
