import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, OperatorFunction, startWith, switchMap } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';
import { VinomioVintageService } from 'src/app/services/vinomio-vintage.service';

@Component({
  selector: 'app-wine-search-add',
  templateUrl: './wine-search-add.component.html',
  styleUrls: ['./wine-search-add.component.css']
})
export class WineSearchAddComponent implements OnInit {

  profile!: Profile
  //@Input() navData!: any

  //@Output() navEvent =  new EventEmitter<{}>();

  addWineForm!:FormGroup
  vintageObject!:any
  bottleCount:number = 0
  bottleCollection:{id:number,format:any}[]=[]
  //searchControl !: FormControl 

  tabNavCollection:{name:string,isActive:boolean}[]=[]

  formats: { id: string; name: string }[] = [
    { id: '1.5L', name: '1.5L' },
    { id: '375mL', name: '375mL' },
    { id: '750ml', name: '750ml' },
  ];
  search!: OperatorFunction<string, readonly any[]>;
  vintages: { id: number; year: string }[] = []
  constructor(
    private collectionService:VinomioCollectionService,
    private vintageService:VinomioVintageService,
    private authService: AuthService,
    private route:ActivatedRoute
  ) { 
    this.profile = this.authService.getCurrentUser()
    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
       const vintageId = params.get('id')
       //this.wineService.getByWine(wineId).subscribe((res) => { console.log(res); this.wineObject = res })
        this.vintageService.getByVintageId(vintageId).subscribe((res:any[]) => this.vintageObject=res[0])
      }
    });
  }

  ngOnInit(): void {
    /*
    this.vintages = this.navData.data.wine.Vintages.map((x:any) =>  {return {id:x.id,year:x.year}})

    this.addWineForm = new FormGroup({
      purchasedOn : new FormControl('',[Validators.required, Validators.pattern('[0-1][0-9]/[0-3][0-9]/[0-9]{4}')]),
      deliverBy : new FormControl('',[Validators.required, Validators.pattern('[0-1][0-9]/[0-3][0-9]/[0-9]{4}')]),
      numOfBottles : new FormControl('1',[Validators.required, Validators.pattern('[0-9]+')]),
      price : new FormControl('',[Validators.required]),
      format : new FormControl("750ml",[Validators.required]),
      state : new FormControl(false),
      searchControl : new FormControl('',[Validators.required,this.forbiddenYearValidator(/([0-9]{4}|N\.V\.)/i)])
    })
    */
    this.addWineForm = new FormGroup({
      format : new FormControl(this.formats[this.formats.length-1].id),
    })
    this.tabNavCollection.push({name:this.addWineForm.get('format')?.value, isActive:true})
  }
  setNavTabActiveTab(selectedSize:any){
    this.tabNavCollection.forEach(i => { i.isActive=false;})
    if(this.tabNavCollection.some(i => i && i.name===selectedSize))
      this.tabNavCollection.filter(i => i.name === this.addWineForm.get('format')?.value)[0].isActive = true
    else
      this.tabNavCollection.push({name:this.addWineForm.get('format')?.value, isActive:true})
  }
  onNavTabClick(navTab:any){
    this.addWineForm.patchValue({format:navTab.name})
    this.setNavTabActiveTab(navTab.name)
  }
  onChange(event:any){
    const options:HTMLOptionsCollection=event.target['options']
    const selectedSize=options[options.selectedIndex].text
    this.setNavTabActiveTab(selectedSize)
  }
  onAdd(){
    if(!this.bottleCollection)
      this.bottleCollection=[]
    this.bottleCollection.push({id:this.bottleCount++,format:this.addWineForm.get('format')?.value})
  }
  onRemove(){
    if(this.bottleCount > 0){
      this.bottleCollection.pop()
      this.bottleCount--;
    } 
  }
  public get getAddBottleCollection(){
    return this.bottleCollection.filter(i => i.format === this.addWineForm.get('format')?.value)
  }
  forbiddenYearValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const vintage = control.value?.year ? control.value?.year : control.value;
      const forbidden = nameRe.test(vintage);
      //console.log(forbidden)
      return forbidden && 
           (Number(vintage) > 1900 &&  
            Number(vintage) <= Number(new Date().getFullYear()) + 1) ||  
            vintage === "N.V." ?  null : {forbiddenYear: {value: control.value}}
    };
  }
  onBack(){
    //this.navEvent.emit({history:this.navData.history})
  }
  onSubmit(){
    
    //const data:any[] = [{
    //    //vintageId: this.navData.data.vintageId,
    //    vintage: ""+(this.addWineForm.get('searchControl')?.value?.year | this.addWineForm.get('searchControl')?.value),
    //    wineId: this.navData.data.wine.id,
    //    cellarId: this.profile.cellar,
    //    price: this.addWineForm.value.price,
    //    bottleCount: this.addWineForm.value.numOfBottles,
    //    bottleSize: this.addWineForm.value.format,
    //    /*locationId: 0,
    //    acquiringSourceId: 0,
    //    allocationEventId: this.allocationEvent.id,*/
    //    purchasedOn:this.addWineForm.value.purchasedOn,
    //    deliverBy: this.addWineForm.value.deliverBy,
    //    statusId:  this.addWineForm.value.state ? 'allocated' : 'pending'
    //  }];
      //console.log(data)
    /*
    if(data.length > 0){
      this.collectionService.add(data).pipe(
        catchError((err) => { console.debug(err); return EMPTY})
      )
      .subscribe((r) =>this.navEvent.emit({}));
    }*/
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
    this.addWineForm.patchValue({searchControl:selection.item})
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
/*
  public get WineName():string{
    return `${this.navData.data.wine.name}`
  }
  public get Region():string{
    return `${this.navData.data.wine.Region.name}`
  }
  public get MasterVarietal():string{
    return `${this.navData.data.wine.MasterVarietal.name}`
  }*/
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
