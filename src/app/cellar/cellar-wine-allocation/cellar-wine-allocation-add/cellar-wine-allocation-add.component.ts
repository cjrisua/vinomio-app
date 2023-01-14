import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Allocation } from 'src/app/models/Allocation';
import { Profile } from 'src/app/models/Profile';
import { Wine } from 'src/app/models/Wine';
import { VinomioAllocationService } from 'src/app/services/vinomio-allocation.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-cellar-wine-allocation-add',
  templateUrl: './cellar-wine-allocation-add.component.html',
  styleUrls: ['./cellar-wine-allocation-add.component.css']
})
export class CellarWineAllocationAddComponent implements OnInit {

  @Input() currentUser!:Profile
  dataSource = new MatTableDataSource<Allocation>();

  constructor(
    private router: Router,
    private service: VinomioAllocationService
  ) { }

  ngOnInit(): void {
    this.getSourceData()
  }
  private getSourceData(text?:string){
    this.service.get(this.currentUser.id,false)
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
  public ViewOrDeleteModelItem(item: any) {
    //console.log(`naviage to id ${JSON.stringify(item.event)}`);
    if(item.action=='view')
      this.router.navigateByUrl('/admin/role/' + item.event.id, { state: item.event });
    else if(item.action=='delete')
      this.service.delete(item.event.id).subscribe(() => this.ngOnInit())
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:0}
  }
}
