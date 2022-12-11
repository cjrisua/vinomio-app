import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { Review } from 'src/app/models/Review';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cellar-wine-review',
  templateUrl: './cellar-wine-review.component.html',
  styleUrls: ['./cellar-wine-review.component.css']
})
export class CellarWineReviewComponent implements OnInit {

  userProfile: Profile
  @Input() userReview!:Review

  constructor(
    private authService: AuthService
  ) { 
    this.userProfile = this.authService.getCurrentUser()  
  }

  ngOnInit(): void {
  }

}
