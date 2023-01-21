import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, debounceTime, EMPTY, map, Observable, Subject, switchMap } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { Review } from 'src/app/models/Review';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioReviewService } from 'src/app/services/vinomio-review.service';

@Component({
  selector: 'app-wine-review-view',
  templateUrl: './wine-review-view.component.html',
  styleUrls: ['./wine-review-view.component.css']
})
export class WineReviewViewComponent implements OnInit {

  wineId!:number
  Reviews$ !: Observable<Review[]>
  FilterCollection !:{type:string,value:string,toggle:boolean,hidden?:boolean}[]
  ReviewCollection !:Review[]
  private _filter:{key:string,value:any[]}[]=[]
  toggle = false;
  filter$: Subject<any> = new Subject();
  private  _reviewDao!:Review[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: VinomioReviewService
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
        this.wineId = Number(params.get('id'))
      }
    });
  }

  ngOnInit(): void {
    //GET /api/review/wine/24?cellarId=2 200 1415 - 44.841 ms
    this.Reviews$ = this.reviewService.getListByWine(this.wineId)
    .pipe(
      map((reviewDao: Review[]) => {
      const tagsArray = reviewDao.reduce((tags:any[],item:Review)=>{item.tags?.filter(i => i.name).map(i => tags.push(i.name)); return tags},[])
      //const scores = [...new Set(reviewDao.map(i => i.score?.toString()))]
      const year = [...new Set(reviewDao.map(i => i.vintage?.year?.toString()))]
      this.FilterCollection = [...year.map((i)=>{return {type:'year',value:i, toggle:this.toggle}}),...tagsArray.map((i)=>{return {type:'hashtag',value:i,toggle:this.toggle}})]
      this.ReviewCollection = reviewDao
      this._reviewDao = reviewDao
      return reviewDao;
      }),
      catchError(()=>EMPTY)
      )
      this.filter$
      .pipe(
        debounceTime(500),
        map((filter:any[]) =>{
          const fByYears:{key:string,value:any[]} = filter.find(y => y.key=='year' && y.value.length > 0)
          const fByTag:{key:string,value:any[]} = filter.find(y => y.key=='hashtag' && y.value.length > 0)
          return this._reviewDao.filter((r:Review) => {
            var match:boolean = false
            if(fByYears && fByYears.value.length > 0)
              match = fByYears.value.includes(r.vintage?.year.toString())
            if((fByYears && match || !fByYears ) && fByTag && fByTag.value.length > 0){
              match = fByTag.value.some(item => r.tags?.find(i => i.name==`#${item}`))
              //if(!match)
              //   fByTag.value.forEach(t => this.FilterCollection.find(i =>i.value==t)?.hidden == true)
            }
            return match
          })
        }),
        map((filteredDao) => {

          return filteredDao
        })
        )
      .subscribe((filteredDao:Review[]) =>{
        if(filteredDao.length==0 && !this.FilterCollection.some(i => i.toggle))
          this.ReviewCollection = this._reviewDao
        else this.ReviewCollection = filteredDao
      });
  }
  onGoBack(){
    
  }
  applyFilter(tag:any,button:any){
    tag.toggle = !tag.toggle
    const item = this._filter.find(i => i.key==tag.type)
    const value = (<HTMLBaseElement>button).innerText.trim()
    if(item && !item.value.includes(value)) item.value.push(value)
    else if(item && !tag.toggle) item.value = item.value.filter(i => i !=value)
    else if (!item) this._filter.push({key:tag.type,value:[value]})
    this.filter$.next(this._filter);
  }
}
