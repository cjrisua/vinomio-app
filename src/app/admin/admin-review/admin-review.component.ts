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
  dataSource!:MatTableDataSource<Review>;
  isDebugOn:boolean=false
  obs$!:Observable<any>
  clearForm = new Subject()

  constructor(
    private router: Router,
    private reviewService: VinomioReviewService
  ) { 
    this.obs$ =  this.reviewService.getList().pipe(
      map((reviews:any)=>{
        this.dataSource = new MatTableDataSource(reviews)
      }),
      map(()=>true),
      catchError(()=>of([]))
    )
  }

  ngOnInit(): void {

  }

  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  private getSourceData(text?:string){
    const data={vintage__wine__name__iLike:text}
    this.reviewService.getList(data).pipe(
      catchError(()=>of([]))
    )
    .subscribe(data => {
      this.dataSource.data = data;
      });
  }
  public onDelete(item: any) {
      this.reviewService.delete(item).subscribe(() => {
        this.clearForm.next('')
        this.getSourceData()
      })
  }
  public get showing(){
    return {limit:this.dataSource.data.length, count:this.reviewService.count}
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
