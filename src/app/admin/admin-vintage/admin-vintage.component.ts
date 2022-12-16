import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { Vintage } from '../../models/Vintage';
import { VinomioVintageService } from '../../services/vinomio-vintage.service';

@Component({
  selector: 'app-admin-vintage',
  templateUrl: './admin-vintage.component.html',
  styleUrls: ['./admin-vintage.component.css']
})
export class AdminVintageComponent implements OnInit {
  displayedColumns=['id','year','Wine.name']
  dataSource = new MatTableDataSource<Vintage>();
  exclusionColumns = ['wineId','year'];
  model$!: Observable<any>
  modelName="Vintage";
  clearForm = new Subject()
  
  constructor(
    private vintageService: VinomioVintageService,
    private router: Router
  ) {
    this.model$ = this.vintageService.get().pipe(
      map((data: any[]) => {
        this.dataSource.data = data.map(m => {m['name']= `${m.year} ${m.Wine.name}`; return m})
      }),
      map(() => this.modelName),
      catchError(() => of([]))
    );
   }

  ngOnInit(): void {
    //this.getSourceData()
  }
  private getSourceData(text?:string){
    this.vintageService.get()
    .pipe(
      catchError(()=>of([]))
    )
    .subscribe((data) => {
      this.dataSource.data = data.map(m => {
        m['name']= `${m.year} ${m.Wine.name}`
        return m;
      })
    });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    if(wine.action=='view')
    this.router.navigateByUrl('/admin/vintage/' + wine.event.id, { state: wine.event });
  else if(wine.action=='delete')
    this.vintageService.delete(wine.event.id).subscribe(() => {
      this.clearForm.next('')
      this.getSourceData()
    })
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.vintageService.count}
  }
}
