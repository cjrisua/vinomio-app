import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wine-review-item',
  templateUrl: './wine-review-item.component.html',
  styleUrls: ['./wine-review-item.component.css']
})
export class WineReviewItemComponent implements OnInit {

  @Input() Review!:any 

  constructor() { }


  ngOnInit(): void {
  }

}
