import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-wine-search-view',
  templateUrl: './wine-search-view.component.html',
  styleUrls: ['./wine-search-view.component.css']
})
export class WineSearchViewComponent implements OnInit {

  wineObject:any
  starRating = 4; 

  constructor(
    private wineService:VinomioWineService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
       const wineId = params.get('id')
       this.wineService.getByWine(wineId).subscribe((res) => { this.wineObject = res })
      }
    });

  }

  ngOnInit(): void {
   
  }

}
