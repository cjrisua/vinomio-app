import { Component, OnInit } from '@angular/core';
import { VinomioWineService } from '../../services/vinomio-wine.service';
import { Wine } from '../../models/Wine';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producer } from '../../models/Producer';
import { catchError, of, Observable, switchMap, map, OperatorFunction, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-admin-wines',
  templateUrl: './admin-wines.component.html',
  styleUrls: ['./admin-wines.component.css'],
})
export class AdminWinesComponent implements OnInit {
  displayedColumns = [
    'id',
    'producer',
    'name',
    'slug',
    'region',
    'varietal',
    'vintages',
  ];
  exclusionColumns = [];
  dataSource!:MatTableDataSource<any>
  model$!: Observable<any>
  search!: OperatorFunction<string, readonly {name:string, id:number}[]>;
  
  constructor(
    private wineService: VinomioWineService,
    private router: Router
  ) {
    this.model$=this.wineService.get().pipe(
      map((data:any[])=>{
        const result = data.map((d) => this.mapWineResponse(d));
        this.dataSource=new MatTableDataSource(result)
      }),
      map(()=>"Wine"),
      catchError(()=>of([]))
    )
  }

  ngOnInit(): void {
   
  }
  private mapWineResponse(wine:any):Wine{
    const vintages = wine.Vintages.map((u: any) => u.year);
    const result: Wine = {
      id: wine.id,
      name: wine.name,
      slug: wine.slug,
      Producer: wine.Producer,
      Region: wine.Region,
      MasterVarietal: wine.MasterVarietal,
      color: wine.color,
      type: wine.type,
      vintages: vintages,
    };
    return result;
  }
  public searchEvent(keyword:string){
    this.wineService.get({name:keyword}).pipe(
      map((data:any[])=>{
        const result = data.map((d) => this.mapWineResponse(d));
        return new MatTableDataSource(result)
      }),
      catchError(()=> of(new MatTableDataSource()))
    ).subscribe((res:MatTableDataSource<any>)=> this.dataSource = res)
  }
  public ViewOrDeleteModelItem(wine: any) {
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/wine/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.wineService.delete(wine.event.id).subscribe(() => this.ngOnInit())
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.wineService.count}
  }
}
