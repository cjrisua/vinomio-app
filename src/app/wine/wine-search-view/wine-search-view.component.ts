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

  constructor(
    private wineService:VinomioWineService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
       const wineId = params.get('id')
       this.wineService.getByWine(wineId).subscribe((res) => { 
          res[0].Vintages.map((v:any,index:any) =>{
            //if(res[0].review.scores){
              const data = res[0].review.scores.find((s:any) =>s.vintageId == v.id)
              res[0].Vintages[index] = {...v,...data}
            //}
            return v
          })
          this.wineObject = res[0]
        })
      }
    });

  }

  ngOnInit(): void {
   
  }
}
