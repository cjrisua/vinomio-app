import { ViewEncapsulation, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, of, OperatorFunction, startWith, switchMap } from 'rxjs';
import { UserEventAction, WineType, Action, Module } from 'src/app/app.module';
import { Collection } from 'src/app/models/Collection';
import { Profile } from 'src/app/models/Profile';
import { Wine } from 'src/app/models/Wine';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-wine-search',
  templateUrl: './wine-search.component.html',
  styleUrls: ['./wine-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WineSearchComponent implements OnInit {

  @Input() profile!: Profile
  @Input() navData!: any
  @Output() navEvent =  new EventEmitter<{}>();

  Form!: FormGroup
  searchControl !: FormControl
  search!: OperatorFunction<string, readonly any[]>;
  keyword!:string
  wines:Wine[] =[]
  constructor(
    private wineService: VinomioWineService,
    private collectionService: VinomioCollectionService
  ) { }

  ngOnInit(): void {
    this.Form = new FormGroup({})
    this.searchControl = new FormControl()
   
    if(this.navData?.history){
      this.searchControl.setValue(this.navData.history);
      this.onKeyUp({key:"Enter"},this.navData.history)
    }
  }
  onSubmit():void {}

  resultFormatListValue(value: any): string {
    return value.name;
  }
  inputFormatListValue(value: any): string {
     return value.name;
  }
  onSearchSelection(selection:any):any{
    this.wines = []
    this.wines.push(selection.item)
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
          map((w:any) => { return w }),
          catchError(()=> {console.log("continue.."); return EMPTY}))
      }),
      catchError((e)=>{ console .log(e); return []})
    )
  }
  onClear():void{
    this.searchControl.setValue('')
    this.wines = []
  }
  addWine(data:{vintageId?:number, wine:Wine, vintage?:HTMLInputElement})
  {
    const action = new UserEventAction(Action.Add, Module.WineSearch)
    this.navEvent.emit({action:action,data:data,history:this.searchControl.value?.name||this.searchControl.value})
  }
  setStyles(Type:any){
    const type: WineType = <WineType> Type;
    //console.log(Type)
    return {'color': 
      type == WineType.White ? '#E8DCA1':
      type == WineType.Red ? '#651827' :
      'black' 
    }
  }
}
