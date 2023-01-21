import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
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
      map((reviewDao: any) => reviewDao),
      catchError(()=>EMPTY)
      )
  }
  onGoBack(){
    
  }
}
