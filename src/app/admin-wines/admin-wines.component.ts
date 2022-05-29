import { Component, OnInit } from '@angular/core';
import { VinomioWineService } from '../services/vinomio-wine.service';
import { Wine } from '../models/Wine';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producer } from '../models/Producer';
import { catchError, of } from 'rxjs';

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
  dataSource = new MatTableDataSource<any>();
  isEmpty!:string
  
  constructor(
    private wineService: VinomioWineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSourceData()
  }

  private getSourceData(text?:string){
    this.wineService.get(undefined,text)
    .pipe(
      catchError(()=>of([]))
    )
    .subscribe((data) => {
      this.isEmpty= data.length == 0 ? 'true':'false';
      this.dataSource.data = data.map((d) => {
        const vintages = d.Vintages.map((u: any) => u.year);
        const result: Wine = {
          id: d.id,
          name: d.name,
          slug: d.slug,
          producer: d.Producer,
          region: d.Region,
          mastervarietal: d.MasterVarietal,
          color: d.color,
          type: d.type,
          vintages: vintages,
        };
        return result;
      });
    });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    //console.log(`naviage to id ${JSON.stringify(wine.event)}`);
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/wine/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.wineService.delete(wine.event.id).subscribe(() => this.ngOnInit())
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.wineService.count}
  }
}
