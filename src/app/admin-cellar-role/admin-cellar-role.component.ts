import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Role } from '../models/Role';
import { VinomioRoleService } from '../services/vinomio-role.service';

@Component({
  selector: 'app-admin-cellar-role',
  templateUrl: './admin-cellar-role.component.html',
  styleUrls: ['./admin-cellar-role.component.css']
})
export class AdminCellarRoleComponent implements OnInit {

  displayedColumns=['id','name','slug']
  exclusionColumns=[]
  dataSource = new MatTableDataSource<Role>();
  isEmpty!:string
 
  constructor(
    private router: Router,
    private roleService:VinomioRoleService
  ) { }

  ngOnInit(): void {
    this.getSourceData()
  }
  private getSourceData(text?:string){
    this.roleService.get(text)
    .pipe(
      catchError(()=>of([]))
    )
    .subscribe((data) => {
      this.dataSource.data = data;
      this.isEmpty= data.length == 0 ? 'true':'false';
    });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(item: any) {
    console.log(`naviage to id ${JSON.stringify(item.event)}`);
    if(item.action=='view')
      this.router.navigateByUrl('/admin/role/' + item.event.id, { state: item.event });
    else if(item.action=='delete')
      this.roleService.delete(item.event.id).subscribe(() => this.ngOnInit())
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.roleService.count}
  }
}
