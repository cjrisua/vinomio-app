import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { People } from '../../models/People';
import { VinomioRegionService } from '../../services/vinomio-region.service';


@Component({
  selector: 'app-admin-people',
  templateUrl: './admin-people.component.html',
  styleUrls: ['./admin-people.component.css']
})
export class AdminPeopleComponent implements OnInit {

  exclusionColumns=['country','regions','parent']
  dataSource = new MatTableDataSource<People>();
  isEmpty!:string

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSourceData()
  }
  private getSourceData(text?:string){
    /*
    this.regionService.get(true,-1,text)
    .pipe(
      catchError(()=>of([]))
    )
    .subscribe(data => {
      this.dataSource.data = data;
      this.isEmpty= data.length == 0 ? 'true':'false';
      });*/
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    /*
    console.log(`naviage to id ${JSON.stringify(wine.event)}`);
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/region/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.regionService.delete(wine.event.id).subscribe(() => this.ngOnInit())
      */
  }
  public get showing(){
    return {
      limit:0,
      count:0
    }
    //return {limit:this.dataSource.data.length,count:this.regionService.count}
  }

}
