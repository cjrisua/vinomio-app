import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Wine } from 'src/app/models/Wine';
import { VinomioVintageService } from 'src/app/services/vinomio-vintage.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-wine-search-view',
  templateUrl: './wine-search-view.component.html',
  styleUrls: ['./wine-search-view.component.css']
})

export class WineSearchViewComponent implements OnInit {

  wineObject!:any
  starRating = 4; 
  score!:{id:number,score:[]}
  vintageForm!:FormGroup

  constructor(
    private wineService:VinomioWineService,
    private vintageService:VinomioVintageService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
       const wineId = params.get('id')
       this.mapWineObject(wineId)
      }
    });

  }
  private mapWineObject(wineId:any): void{
    this.wineService.getByWine(wineId).subscribe((res) => { 
      const wine=res[0]
      this.score=wine.Vintages.map((v:any) => {return {id: v.id, scores:v.Reviews.map((s:any) => s.score)}})
      
      this.wineObject = wine

      this.vintageForm = new FormGroup({
        year: new FormControl(),
        wineId: new FormControl(this.wineObject?.id|0)
      })
    })
  }
  ngOnInit(): void {
   
   
  }
  onAddVintage() : void{
   const data = this.vintageForm.value
   this.vintageService.add(data)
   .pipe(catchError(() => EMPTY))
   .subscribe(() => {
     this.mapWineObject(this.vintageForm.get('wineId')?.value)
   });
  }
  /*
  PostNote(note: HTMLDivElement) {
    //console.log(this.profile)
    //console.log(note.textContent)
    //note.textContent="";
    this.postForm.patchValue({ review: note.textContent });
    this.reviewService
      .add(this.postForm.value)
      .pipe(catchError(() => EMPTY))
      .subscribe(() => {
        this.GetReviews(this.wine[0].Vintage.Wine.id);
        note.textContent = '';
      });
  }*/
}
