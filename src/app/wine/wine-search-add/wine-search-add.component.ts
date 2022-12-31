import { formatDate } from '@angular/common';
import { Component, ViewEncapsulation, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, max, Observable, of, OperatorFunction, startWith, switchMap } from 'rxjs';
import { Cellar } from 'src/app/models/Cellar';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';
import { VinomioMerchantService } from 'src/app/services/vinomio-merchant.service';
import { VinomioVintageService } from 'src/app/services/vinomio-vintage.service';

interface BottleFormat{
  id:string;
  name:string;
}
const castArray = (value: any) => Array.isArray(value) ? value : [value];

@Component({
  selector: 'app-wine-search-add',
  templateUrl: './wine-search-add.component.html',
  styleUrls: ['./wine-search-add.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WineSearchAddComponent implements OnInit {

  profile!: Profile
  cellar!: Cellar
  submitted = false;
  addWineForm!:FormGroup
  vintageObject!:any
  selectedFormat!:BottleFormat
  formats: BottleFormat[] = [
    { id: '750ml', name: '750ml' },
    { id: '1.5L', name: '1.5L' },
    { id: '375mL', name: '375mL' }
  ];
  partition!: OperatorFunction<string, readonly any[]>;
  search!: OperatorFunction<string, readonly any[]>;
  merchant!:OperatorFunction<string, readonly any[]>;
  vintages: { id: number; year: string }[] = []
  constructor(
    private cellarService:VinomioCellarService,
    private merchantService:VinomioMerchantService,
    private collectionService:VinomioCollectionService,
    private vintageService:VinomioVintageService,
    private authService: AuthService,
    private route:ActivatedRoute,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) { 
    this.profile = this.authService.getCurrentUser()
    this.cellarService.get(this.profile.cellar || 0).pipe(map(data => data)).subscribe(res => this.cellar = res)
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
      purchasedOn : new FormControl('',[Validators.required, Validators.pattern('[0-1][1-9]/[0-3][0-9]/[0-9]{4}')]),
      deliverBy : new FormControl('',[Validators.required, Validators.pattern('[0-1][1-9]/[0-3][0-9]/[0-9]{4}')]),
      numOfBottles : new FormControl('1',[Validators.required, Validators.pattern('[0-9]+')]),
      price : new FormControl('',[Validators.required]),
      format : new FormControl("750ml",[Validators.required]),
      state : new FormControl(false),
      searchControl : new FormControl('',[Validators.required,this.forbiddenYearValidator(/[0-9]{4}/i)])
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
  public MerchantSelection(data:any){
    //const formatCollection = this.formatCollection.controls.find( i => i.value.size == this.selectedFormat.id) as FormGroup
    //formatCollection.patchValue({merchant: data.id})
    //console.log(formatCollection)
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
    return <FormArray>this.addWineForm.get('formatCollection');
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
      console.log(data)
      this.collectionService.add(data).pipe(
        catchError((err) => { console.debug(err); return EMPTY})
      )
      .subscribe((resp) => {
        if(resp.status == 201){
          //let object = this.allocations.filter(p=>p.id == event.allocationId)[0]
          //object.events = object.events?.filter((i:any)=>i.id != event.id)
          this.router.navigate(['/cellar'])
        }
      });
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
  onFilterMerchantList() : void{
    let result:any[]=[]
    this.merchant = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(''),
      filter((i) => i.length > 0),
      map((searchText: string ) => {   
       const merchants = this.merchantService.get(this.profile.id,searchText).pipe(
        map((m:any) => {
          return m.map((r:any) => {return {id:r.id, value:r.name}})
        }),
        catchError((e)=>{return of([])})
       ).subscribe(r => result = r)
       //console.log(result)
        return result
      }),
      catchError((e)=>{ console .log("error2"); return []})
    )
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
          console.debug(results)
          return results ? results : []
      }),
      catchError((e)=>{ console .log(e); return []})
    )
  }
  updateStatus(){
    this.addWineForm.patchValue({"state" : !this.addWineForm.value.state})
  }
  SearchSelection(selection:any){
    const s: any = {
      id: selection.item.id,
      name: selection.item.name,
    };
  }
  onReviewerFilterList(index:number,id:string){
    console.log(id)
    const formGroup:FormGroup = (<FormArray>this.addWineForm.get('formatCollection')).controls.filter(i => i.get('size')?.value === this.selectedFormat.id)[0] as FormGroup
    const locationFormGroup:FormGroup = (<FormArray>formGroup.get('cellarLocationList')).at(index) as FormGroup
    const selectedLocationName = locationFormGroup.get('section')?.value?.id
    console.log(selectedLocationName)
    this.partition = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(''),
      filter((i) => i.length > 0),
      map((searchText: string ) => {        
    
        if(id==='location')
          return [{id:this.cellar.id,value:this.cellar.name}]
        else if(id==='section')
          return [...new Set(this.cellar.attributes.partition?.map(m => m.name))].map(m => {return {id:m,value:m}})
        else if(id==='bin')
          return [...new Set(this.cellar.attributes.partition?.filter(i => i.name===selectedLocationName).map(i => { return {id:i.segment,value:i.segment}}))]
        return [{}]
      }),
      catchError((e)=>{ console .log(e); return []})
    )
  }
  partitionResultFormatListValue(value: any): string {
    return value.value;
  }
  partitionInputFormatListValue(value: any): string {
     return value.value;
  }
  merchantResultFormatListValue(value: any): string {
    return value.value;
  }
  merchantInputFormatListValue(value: any): string {
     return value.value;
  }
}
