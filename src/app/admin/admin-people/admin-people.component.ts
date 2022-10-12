import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { VinomioPeopleService } from 'src/app/services/vinomio-people.service';
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
    private peopleService:VinomioPeopleService
  ) { }

  ngOnInit(): void {
    this.getSourceData()
  }
  private getSourceData(text?:string){
    this.peopleService.getList().pipe(
      catchError(()=>of([]))
    )
    .subscribe(data => {
      this.dataSource.data = data;
      this.isEmpty= data.length == 0 ? 'true':'false';
      });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(item: any) {
    if(item.action=='view')
      this.router.navigate(['/admin/people/', item.event.id]);
    else if(item.action=='delete')
      this.peopleService.delete(item.event.id).subscribe(() => this.ngOnInit())
      
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.peopleService.count ? this.peopleService.count:0}
  }

}
