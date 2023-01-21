import { Component, Input, OnInit } from '@angular/core';
import { formatReview } from 'src/app/app.module';
import { Review } from 'src/app/models/Review';

@Component({
  selector: 'app-wine-review-item',
  templateUrl: './wine-review-item.component.html',
  styleUrls: ['./wine-review-item.component.css']
})
export class WineReviewItemComponent implements OnInit {

  @Input() Review!:Review 
  userReview!:string
  constructor() { }


  ngOnInit(): void {
    this.userReview = formatReview(this.Review.message || "")
  }

}
