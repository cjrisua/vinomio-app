import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/Review';
import { BehaviorSubject, catchError, map, Observable, of, Subject } from 'rxjs';
import { VinomioReviewService } from 'src/app/services/vinomio-review.service';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css']
})
export class AdminReviewComponent implements OnInit {

  exclusionColumns=[]
  dataSource:MatTableDataSource<Review>;
  isEmpty!:string
  isDebugOn:boolean=false

  constructor(
    private router: Router,
    private reviewService: VinomioReviewService
  ) { 
    this.dataSource = new MatTableDataSource<Review>();
  }

  ngOnInit(): void {
    this.getSourceData()
    //this.subject = new BehaviorSubject()
  }

  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  private getSourceData(text?:string){
    this.reviewService.getList().pipe(
      catchError(()=>of([]))
    )
    .subscribe(data => {
      this.dataSource.data = data;
      this.isEmpty= data.length == 0 ? 'true':'false';
      });
  }
  public ViewOrDeleteModelItem(item: any) {
    /*if(item.action=='view')
      this.router.navigate(['/admin/people/', item.event.id]);
    else if(item.action=='delete')
      this.peopleService.delete(item.event.id).subscribe(() => this.ngOnInit())
     */ 
  }
  public get showing(){
    return {
      limit:this.dataSource.data.length,
      count:0}
  }
  onDebug(){
    this.isDebugOn = !this.isDebugOn
    console.log("here")
  }
  formatTag(tags:any[]){
    return tags.map(p => <string>p.name.replace("#","")).join(', ')
  }
  formatReview(raw:string){
    const regex = /\B#[^ !@#$%^&*(),.?":{}|<>]+/g;
    const value = raw.replace(regex,(n)=>{return `<span class="hashtag">${n}</span>`})
    //console.debug(value)
    return value
  }

}
