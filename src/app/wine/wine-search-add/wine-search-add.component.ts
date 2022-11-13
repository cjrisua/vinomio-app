import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, max, Observable, OperatorFunction, startWith, switchMap } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';
import { VinomioVintageService } from 'src/app/services/vinomio-vintage.service';

interface BottleFormat{
  id:string;
  name:string;
}
const castArray = (value: any) => Array.isArray(value) ? value : [value];

@Component({
  selector: 'app-wine-search-add',
  templateUrl: './wine-search-add.component.html',
  styleUrls: ['./wine-search-add.component.css']
})

export class WineSearchAddComponent implements OnInit {

  profile!: Profile
  submitted = false;
  addWineForm!:FormGroup
  vintageObject!:any
  selectedFormat!:BottleFormat
  formats: BottleFormat[] = [
    { id: '750ml', name: '750ml' },
    { id: '1.5L', name: '1.5L' },
    { id: '375mL', name: '375mL' }
  ];

  search!: OperatorFunction<string, readonly any[]>;
  vintages: { id: number; year: string }[] = []
  constructor(
    private collectionService:VinomioCollectionService,
    private vintageService:VinomioVintageService,
    private authService: AuthService,
    private route:ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
  ) { 
    this.profile = this.authService.getCurrentUser()
    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
       const vintageId = params.get('id')
       this.vintageService.getByVintageId(vintageId).subscribe((res:any[]) => this.vintageObject=res[0])
      }
    });
  }

  ngOnInit(): void {
    this.selectedFormat = this.formats[0]
    this.addWineForm = new FormGroup({
      note : new FormControl(),
      formatCollection: new FormArray([],[Validators.required])
    })
    this.formatCollection.push(this.addWineFormat())
  }
  addWineFormat(): FormGroup{
   const wineFormatItem = new FormGroup({
      purchasedDate: new FormControl(`${formatDate(Date.now(), 'MM/dd/yyyy', this.locale)}`,),
      deliveryDate: new FormControl("",[Validators.required]),
      merchant: new FormControl("",[Validators.required]),
      cost: new FormControl("",[Validators.required]),
      status: new FormControl(),
      size: new FormControl(this.selectedFormat.id,[Validators.required]),
      count: new FormControl(0,[Validators.required,Validators.min(1)]),
      cellarLocationList: new FormArray([])
    })
    return wineFormatItem
  }
  allocateCellarLocation():FormGroup{
    const cellarLocationItem = new FormGroup({
      location: new FormControl(),
      section: new FormControl(),
      bin: new FormControl()
    })
    return cellarLocationItem
  }
  setNavActiveTab(selectedSize:any){
    if(!this.formatCollection.controls.find(i => i.value.size === selectedSize))
      this.formatCollection.push(this.addWineFormat())
  }
  onNavTabClick(navTab:any){
    this.selectedFormat = this.formats.filter(i => i.id == navTab.size)[0]
  }
  onChange(event:any){
    this.setNavActiveTab(this.selectedFormat.id)
  }
  public ariaLabelledby(value:string):string{
    return `${value}-tab`
  }
  public dataBsTarget(value:string):string{
    return `#${value}`
  }
  onAdd(){
    const formatCollection = this.formatCollection.controls.find( i => i.value.size == this.selectedFormat.id) as FormGroup
    const cellarLocationList = formatCollection.get('cellarLocationList') as FormArray
    const count:number = formatCollection.get('count')?.value
    formatCollection.patchValue({count:count+1})
    cellarLocationList.push(this.allocateCellarLocation())
  }
  onRemove(){
    const formatCollection = this.formatCollection.controls.find( i => i.value.size == this.selectedFormat.id) as FormGroup
    const cellarLocationList = formatCollection.get('cellarLocationList') as FormArray
    if(cellarLocationList){
      cellarLocationList.removeAt(cellarLocationList.length-1)
      const count:number = formatCollection.get('count')?.value
      formatCollection.patchValue({count:count-1})
    }
  }
  public get formatCollection():FormArray{
    return this.addWineForm.get('formatCollection') as FormArray;
  }
  public get cellarLocationList():FormArray{
    const formArray = this.formatCollection.controls.find( i => i.value.size == this.selectedFormat.id)?.get('cellarLocationList') as FormArray
    return formArray
  }
  public getFormatGroup(data:any){
    return data as FormGroup
  }
  public debug(data:any){
    console.log(data)
  }
  public isActive(tabName:string){
    return tabName === this.selectedFormat.id ? true : false
  }
  public get tabNavCollection(){
    return this.formatCollection.value
  }
  public  get getActiveTabBottleCount(){
    const tabInfo = this.formatCollection.controls.find(i => i.value.size == this.selectedFormat.id)
    if(tabInfo){
      return tabInfo.value.cellarLocationList.length
    }
    return 0
  }
  forbiddenYearValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const vintage = control.value?.year ? control.value?.year : control.value;
      const forbidden = nameRe.test(vintage);
      return forbidden && 
           (Number(vintage) > 1900 &&  
            Number(vintage) <= Number(new Date().getFullYear()) + 1) ||  
            vintage === "N.V." ?  null : {forbiddenYear: {value: control.value}}
    };
  }
  onDeleteTab(navigationTabEvent:any){
    const navToTab = this.tabNavCollection.filter((i: { size: any; }) => i.size != navigationTabEvent.size ).map((i: { size: any; }) => {return {size:i.size}})[0]
    console.log(navToTab)
    const droppedTab = this.formatCollection.controls.findIndex(i => i.value.size == navigationTabEvent.size)
    this.formatCollection.removeAt(droppedTab)
    this.onNavTabClick(navToTab)
  }
  onBack(){
  
  }
  onSubmit(){
    const data:any[] = this.formatCollection.controls.map(f => {
       let data = {
          vintage:this.vintageObject.year,
          wineId:this.vintageObject.wineId,
          cellarId: this.profile.cellar,
          price: f.value.cost,
          bottleCount: f.value.count,
          bottleSize: f.value.size,
          bottleLocation:[],
          purchasedOn: f.value.purchasedDate,
          deliverBy: f.value.deliveryDate,
          statusId:  f.value.status == true ? 'pending' : 'allocated',
          comment: this.addWineForm.value.note
       }
       data.bottleLocation = f.value.cellarLocationList.map((l: any) => {
          return {
              storage:l.location,
              section:l.section,
              bin:l.bin
            }
       })
       return data;
    })
    if(data.length > 0){
      /*[
    {
        "vintage": "N.V.",
        "wineId": 30,
        "cellarId": 2,
        "price": "75.00",
        "bottleCount": 1,
        "bottleSize": "750ml",
        "bottleLocation": [
            {
                "storage": "kitchen",
                "section": null,
                "bin": null
            }
        ],
        "purchasedOn": "11/13/2022",
        "deliverBy": "11/13/2022",
        "statusId": "allocated",
        "comment": null
    }
]*/
      //this.collectionService.add(data).pipe(
      //  catchError((err) => { console.debug(err); return EMPTY})
      //)
      //.subscribe((r) =>this.navEvent.emit({}));
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
