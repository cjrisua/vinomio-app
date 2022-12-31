import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { Variety } from '../../models/Variety';
import { VinomioVarietyService } from '../../services/vinomio-variety.service';

@Component({
  selector: 'app-admin-variety',
  templateUrl: './admin-variety.component.html',
  styleUrls: ['./admin-variety.component.css']
})
export class AdminVarietyComponent implements OnInit {

  modelName="Variety"
  displayedColumns=['id','name','slug']
  exclusionColumns=[]
  dataSource = new MatTableDataSource<Variety>();
  model$!: Observable<any>
  clearForm = new Subject()

  constructor(
    private router:Router,
    private varietyService: VinomioVarietyService
  ) { 
    this.model$ = this.varietyService.get()
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
    this.varietyService.get(text)
    .pipe(
      catchError(()=>of([]))
    )
    .subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    if(wine.action=='view')
    this.router.navigateByUrl('/admin/variety/' + wine.event.id, { state: wine.event });
  else if(wine.action=='delete')
    this.varietyService.delete(wine.event.id).subscribe(() => {
      this.clearForm.next('')
      this.getSourceData()
    })
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.varietyService.count}
  }
}
