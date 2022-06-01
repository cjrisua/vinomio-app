import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, of, OperatorFunction, startWith, switchMap } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { Wine } from 'src/app/models/Wine';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-wine-search',
  templateUrl: './wine-search.component.html',
  styleUrls: ['./wine-search.component.css']
})
export class WineSearchComponent implements OnInit {

  @Input() profile!: Profile
  Form!: FormGroup
  searchControl : FormControl = new FormControl();
  search!: OperatorFunction<string, readonly any[]>;
  keyword!:string
  wines:Wine[] =[]
  constructor(
    private wineService: VinomioWineService
  ) { }

  ngOnInit(): void {
    this.Form = new FormGroup({})
  }
  onSubmit():void {}

  resultFormatListValue(value: any): any {
    return value.name;
  }
  inputFormatListValue(value: any): any {
     return value.name;
  }
  onSearchSelection(selection:any) : any {
    console.log(selection)
  }
  onKeyUp(event:any,keyword:any){
    if(event.key == "Enter")
      this.wineService.get({name:keyword}).subscribe((wines)=> this.wines = wines)
  }
  onFilterList() : void {
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(''),
      filter((i) => i.length > 2),
      switchMap((searchText: string ) => {
          return this.wineService.get({name:searchText}).pipe(
          map((w:any) => {return w}),
          catchError(()=> {console.log("continue.."); return EMPTY}))
      }),
      catchError((e)=>{ console .log(e); return []})
    )
  }
  onClear():void{
    this.searchControl.setValue('')
    this.wines = []

  }
}
