import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, OperatorFunction, startWith, switchMap } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';

@Component({
  selector: 'app-wine-search-add',
  templateUrl: './wine-search-add.component.html',
  styleUrls: ['./wine-search-add.component.css']
})
export class WineSearchAddComponent implements OnInit {

  @Input() profile!: Profile
  @Input() navData!: any

  @Output() navEvent =  new EventEmitter<{}>();

  addWineForm!:FormGroup
  //searchControl !: FormControl

  formats: { id: string; name: string }[] = [
    { id: '750ml', name: '750ml' },
    { id: '1.5L', name: '1.5L' },
  ];
  search!: OperatorFunction<string, readonly any[]>;
  vintages: { id: number; year: string }[] = []
  constructor(
    private collectionService:VinomioCollectionService
  ) { }

  ngOnInit(): void {

    this.vintages = this.navData.data.wine.Vintages.map((x:any) =>  {return {id:x.id,year:x.year}})

    this.addWineForm = new FormGroup({
      purchasedOn : new FormControl('',[Validators.required, Validators.pattern('[0-1][1-9]/[0-3][0-9]/[0-9]{4}')]),
      deliverBy : new FormControl('',[Validators.required, Validators.pattern('[0-1][1-9]/[0-3][0-9]/[0-9]{4}')]),
      numOfBottles : new FormControl('1',[Validators.required, Validators.pattern('[0-9]+')]),
      price : new FormControl('',[Validators.required]),
      format : new FormControl("750ml",[Validators.required]),
      state : new FormControl(false),
      searchControl : new FormControl('',[Validators.required,this.forbiddenYearValidator(/[0-9]{4}/i)])
    })

    
  }
  forbiddenYearValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const vintage = control.value?.year ? control.value?.year : control.value;
      const forbidden = nameRe.test(vintage);
      //console.log(forbidden)
      return forbidden && 
             Number(vintage) > 1800 &&  
             Number(vintage) <= Number(new Date().getFullYear()) + 1 ?  null : {forbiddenYear: {value: control.value}};
    };
  }
  onBack(){
    this.navEvent.emit({history:this.navData.history})
  }
  onSubmit(){
    const data:any[] = [{
        //vintageId: this.navData.data.vintageId,
        vintage: ""+(this.addWineForm.get('searchControl')?.value?.year | this.addWineForm.get('searchControl')?.value),
        wineId: this.navData.data.wine.id,
        cellarId: this.profile.cellar_id,
        price: this.addWineForm.value.price,
        bottleCount: this.addWineForm.value.numOfBottles,
        bottleSize: this.addWineForm.value.format,
        /*locationId: 0,
        acquiringSourceId: 0,
        allocationEventId: this.allocationEvent.id,*/
        purchasedOn:this.addWineForm.value.price,
        deliverBy: this.addWineForm.value.price,
        statusId:  this.addWineForm.value.state ? 'allocated' : 'pending'
      }];
      //console.log(data)
    
    if(data.length > 0){
      this.collectionService.add(data).pipe(
        catchError((err) => { console.debug(err); return EMPTY})
      )
      .subscribe((r) =>this.navEvent.emit({}));
    }
  }
  onClear():void{
    //this.searchControl.setValue('')
    //this.wines = []
  }
  resultFormatListValue(value: any): string {
    return value.year;
  }
  inputFormatListValue(value: any): string {
     return value.year;
  }
  onSearchSelection(selection:any):any{
    //this.wines = []
    //this.wines.push(selection.item)
    //console.log(this.addWineForm.get('searchControl')?.status)
  }
  onKeyUp(event:any,keyword:any){
    //if(event.key == "Enter")
    //  this.wineService.get({name:keyword}).subscribe((wines)=> this.wines = wines)
  }
  onFilterList() : void {
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(''),
      filter((i) => i.length > 0),
      map((searchText: string ) => {
          const results = this.vintages.filter(keyword => keyword.year.toString().startsWith(searchText))
          return results ? results : []
      }),
      catchError((e)=>{ console .log(e); return []})
    )
  }
  updateStatus(){
    this.addWineForm.patchValue({"state" : !this.addWineForm.value.state})
  }

  public get WineName():string{
    return `${this.navData.data.wine.name}`
  }
  public get Region():string{
    return `${this.navData.data.wine.Region.name}`
  }
  public get MasterVarietal():string{
    return `${this.navData.data.wine.MasterVarietal.name}`
  }
/**
 * 
 *  {
  "data": {
    "vintageId": 58,
    "wine": {
      "id": 24,
      "slug": "memento-mori-las-piedras-vineyard",
      "name": "Memento Mori Las Piedras Vineyard",
      "color": "Red",
      "type": "Red",
      "Producer": {
        "id": 7,
        "name": "Memento Mori"
      },
      "Region": {
        "id": 7,
        "name": "St Helena"
      },
      "MasterVarietal": {
        "id": 5,
        "name": "Cabernet Sauvignon"
      },
      "Vintages": [
        {
          "id": 58,
          "year": 2019
        },
        {
          "id": 62,
          "year": 2018
        }
      ]
    }
  },
  "history": "mem"
} 
 */
}
