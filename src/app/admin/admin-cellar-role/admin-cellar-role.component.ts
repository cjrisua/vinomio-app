import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Role } from '../../models/Role';
import { VinomioRoleService } from '../../services/vinomio-role.service';

@Component({
  selector: 'app-admin-cellar-role',
  templateUrl: './admin-cellar-role.component.html',
  styleUrls: ['./admin-cellar-role.component.css']
})
export class AdminCellarRoleComponent implements OnInit {

  displayedColumns=['id','name','slug']
  exclusionColumns=[]
  dataSource = new MatTableDataSource<Role>();
  model$!: Observable<any>
  modelName="Role"
  constructor(
    private router: Router,
    private roleService:VinomioRoleService
  ) {
    this.model$ = this.roleService.get()
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
    this.roleService.get(text)
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
