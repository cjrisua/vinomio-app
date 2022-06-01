import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-wine-review',
  templateUrl: './wine-review.component.html',
  styleUrls: ['./wine-review.component.css']
})
export class WineReviewComponent implements OnInit {

  @Input() profile!:Profile
  constructor() { }

  ngOnInit(): void {
  }

}
