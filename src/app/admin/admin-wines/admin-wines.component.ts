import { Component, OnInit } from '@angular/core';
import { VinomioWineService } from '../../services/vinomio-wine.service';
import { Wine } from '../../models/Wine';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producer } from '../../models/Producer';
import { catchError, of, Observable, switchMap, map, OperatorFunction, debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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
  displayedColumnsExtendedAttributes=[{
    column:{name: 'vintages', type:'link', route:''}
  }]
  exclusionColumns = [];
  dataSource!:MatTableDataSource<any>
  model$!: Observable<any>
  search!: OperatorFunction<string, readonly {name:string, id:number}[]>;
  clearForm = new Subject()
  routeLinkEvent = new Subject()
  
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
  private getSourceData(data?:any){
    this.wineService.get(data).pipe(
      map((data:any[])=>{
        const result = data.map((d) => this.mapWineResponse(d));
        return new MatTableDataSource(result)
      }),
      catchError(()=> of(new MatTableDataSource()))
    ).subscribe((res:MatTableDataSource<any>)=> this.dataSource = res)
  }
  public searchEvent(keyword:string){
    this.getSourceData({name:keyword})
  }
  public ViewOrDeleteModelItem(wine: any) {
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/wine/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.wineService.delete(wine.event.id).subscribe(() => {
        this.clearForm.next('')
        this.getSourceData()
      })
  }
  public subjectRouteLinkEvent(event:any){
    this.router.navigateByUrl('/admin/vintage/' + event.data.id, { state: {navigation:'wine', id:10, Wine:{id:event.data.id,name:event.data.name,slug:event.data.slug, } } });
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.wineService.count}
  }
}
