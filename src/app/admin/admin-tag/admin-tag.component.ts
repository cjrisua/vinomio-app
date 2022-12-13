import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { VinomioTagService } from 'src/app/services/vinomio-tag.service';

@Component({
  selector: 'app-admin-tag',
  templateUrl: './admin-tag.component.html',
  styleUrls: ['./admin-tag.component.css']
})
export class AdminTagComponent implements OnInit {

  modelName="Tags";
  displayedColumns=['id','name','slug']
  exclusionColumns=[]
  dataSource = new MatTableDataSource<any>();
  model$!: Observable<any>

  constructor(
    private router:Router,
    private tagService:VinomioTagService
  ) {
    this.model$ = this.tagService.getList()
    .pipe(
      map((data:any[])=> this.dataSource.data = data),
      map(()=>this.modelName),
      catchError(()=>of([]))
    )
  }

  ngOnInit(): void {
    //console.log("?")
  }
  private getSourceData(text?:string){
    this.tagService.getList()
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
    
    if(item.action=='view')
      this.router.navigate(['/admin/tag/', item.event.id]);
    else if(item.action=='delete')
      this.tagService.delete(item.event.id).subscribe(() => this.ngOnInit())
  }
  public get showing(){
    return { 
      limit:this.dataSource.data.length, 
      count:this.tagService.count ? this.tagService.count : 0
    }
  }
}
