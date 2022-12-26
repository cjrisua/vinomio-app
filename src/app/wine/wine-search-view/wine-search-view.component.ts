import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Wine } from 'src/app/models/Wine';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';


@Component({
  selector: 'app-wine-search-view',
  templateUrl: './wine-search-view.component.html',
  styleUrls: ['./wine-search-view.component.css']
})

export class WineSearchViewComponent implements OnInit {

  wineObject!:any
  starRating = 4; 
  score!:{id:number,score:[]}

  constructor(
    private wineService:VinomioWineService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
       const wineId = params.get('id')
       this.wineService.getByWine(wineId).subscribe((res) => { 
          const wine=res[0]
          this.score=wine.Vintages.map((v:any) => {return {id: v.id, scores:v.Reviews.map((s:any) => s.score)}})
          this.wineObject = wine
        })
      }
    });

  }

  ngOnInit(): void {
   
  }
}
