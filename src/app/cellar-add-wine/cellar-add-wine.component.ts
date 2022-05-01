import { Component, Inject, LOCALE_ID, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardItem } from '../app.module';
import {formatDate} from '@angular/common';
import { VinomioCollectionService } from '../services/vinomio-collection.service';
import { Collection } from '../models/Collection';
import { Profile } from '../models/Profile';
import { Vintage } from '../models/Vintage';
import { VinomioMerchantService } from '../services/vinomio-merchant.service';
import { Merchant } from '../models/Merchant';
import { MatDialog } from '@angular/material/dialog';
import { MerchantDialogComponent } from '../shared/merchant/merchant-dialog/merchant-dialog.component';
import { catchError, EMPTY, map, Observable, skipWhile, startWith, Subject, Subscription } from 'rxjs';
import { VinomioAllocationEventService } from '../services/vinomio-allocation-event.service';
import { AllocationEvent } from '../models/AllocationEvent';
import { AllocationDialogAddComponent } from '../shared/allocation/allocation-dialog-add/allocation-dialog-add.component';

export interface ComponentType<T> {
  new (...args: any[]): T;
}

@Component({
  selector: 'app-cellar-add-wine',
  templateUrl: './cellar-add-wine.component.html',
  styleUrls: ['./cellar-add-wine.component.css']
})
export class CellarAddWineComponent implements OnInit {

  wineform!: FormGroup;

  @Input() currentUser!:Profile
  selectMerchant: Merchant[] = [];
  filteredOptions: Observable<AllocationEvent[]> | undefined;
  
  allocationEvents!: AllocationEvent[]
  merchant:Merchant = new Merchant()

  isAllocation:boolean = false;
  merchantWithAllocation:boolean = false

  _allocationId!:number;
  wineSelection!:Vintage
  
  eventsSubject: Subject<Vintage> = new Subject<Vintage>();
  _bulkItems!:any[]

  constructor( 
    private collectionService: VinomioCollectionService,
    private merchantService: VinomioMerchantService,
    private allocationService: VinomioAllocationEventService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
    Date.now().toString()
    this.wineform = new FormGroup({
      vintageId: new FormControl('',[]),
      count: new FormControl('1',[Validators.required,Validators.minLength(1)]),
      //price: new FormControl('',[Validators.required,Validators.minLength(3)]),
      //format: new FormControl('750ml',[Validators.required,Validators.minLength(3)]),
      price: new FormControl('',[]),
      format: new FormControl('750ml',[]),
      purchasedDate: new FormControl(formatDate(Date.now(),'MM/dd/yyyy',this.locale),[Validators.required,Validators.minLength(3)]),
      deliveryDate: new FormControl('',[Validators.required,Validators.minLength(3)]),
      source: new FormControl('',[Validators.required]),
      notes: new FormControl('',[Validators.minLength(0)]),
      statusId: new FormControl('empty',[Validators.required]),
      allocationId: new FormControl('',[]),
      allocationevent: new FormControl('',[])
    });
    /*
    this.winebulkform = new FormGroup({
      vintageId: new FormControl('',[]),
      count: new FormControl('',[]),
      price: new FormControl('',[]),
      format: new FormControl('',[]),
      purchasedDate: new FormControl(formatDate(Date.now(),'MM/dd/yyyy',this.locale),[Validators.required,Validators.minLength(3)]),
      deliveryDate: new FormControl('',[Validators.required,Validators.minLength(3)]),
      source: new FormControl('',[]),
      notes: new FormControl('',[]),
      statusId: new FormControl('empty',[]),
      allocationId: new FormControl('',[]),
      allocationevent: new FormControl('',[])
    })*/
    this.merchantService.get(this.currentUser.id).subscribe((m) => { 
      this.selectMerchant = m 
    });

  }
  onAllocationEvent(data:AllocationEvent[])
  {
    this.allocationEvents = data;

    const unique = [...new Set(data.map(item => item.allocationId))];
    if(unique.length>0){
      this._allocationId = unique[0] || -1;
    }
      
    this.wineform.get("allocationevent")?.setValue('');

    if(this.allocationEvents.length == 0){
      this.merchantWithAllocation =  false;
      this.filteredOptions = this.wineform.get("allocationevent")?.valueChanges
      .pipe(
        map((d:AllocationEvent[])=>[]))
    }
    else{
      
      this.merchantWithAllocation =  true;
      this.allocationEvents = this.allocationEvents.filter(e => e.slug)
      this.filteredOptions = this.wineform.get("allocationevent")?.valueChanges
        .pipe(
          startWith(''),
          //map((d)=> { //console.log("=>");//console.log(d); return d;}),
          map(value => { const results=  value.length >= 1 ? this._filter(value) :  this.allocationEvents; return results} )
        );
      //this.wineform.get("allocationevent")?.setValidators(Validators.required)
    }
    //console.log(`Merchant allocated?: ${this.merchantWithAllocation} ${this.wineform.value.source}`)
  }

  displayFn(allocationevent: AllocationEvent):string {
    return allocationevent && allocationevent.name ? `${allocationevent.name}` : ''
  }

  onMerchantChange(event:any)
  {
    this.merchantWithAllocation = false;
    this.merchant.id = event.target.selectedOptions[0].value;
    this.merchant.name = event.target.selectedOptions[0].text;
    if(this.merchant.id){
      this.allocationService.get(this.merchant.id)
      .pipe(
        map((d:AllocationEvent[])=> d),
        catchError(err => {  return EMPTY; }))
      .subscribe((data) => this.onAllocationEvent(data));
    }
  }

  onIsViaAllocation(flag:boolean){
    //console.log( this.wineform.value.source)
    this.isAllocation = flag;
    this.wineform.get("allocationevent")?.setValue('')
    //console.log(`Merchant allocated?: ${this.merchantWithAllocation} ${this.wineform.value.source}`)
    //console.log(`flags: ${flag} ${this.merchantWithAllocation} ${this.isAllocation}`)
    if(flag || (this.merchantWithAllocation && this.isAllocation)){
      //console.log("????")
      this.wineform.get("allocationevent")?.setValidators([Validators.required,Validators.minLength(1)])
      this.wineform.get("allocationId")?.setValidators([Validators.required])
    }
    else{
      this.wineform.get("allocationevent")?.setValue('undefined')
      this.wineform.get("allocationevent")?.removeValidators([Validators.required,Validators.minLength(1)])
      this.wineform.get("allocationId")?.removeValidators([Validators.required])
    }
  }
  
  private _filter(value: string) : AllocationEvent[] {
    const filterValue = value.toLowerCase();
    return this.allocationEvents.filter(option => {
      const name = option && option.name ? option.name.toLowerCase() : ""
      name.includes(filterValue)
    });
  }
  wineSearcherSelection(vintage:Vintage){
    this.wineform.patchValue({vintageId:vintage})
  }

  AddWine(){
    this.eventsSubject.next(this.wineform.value.vintageId);
  }
  actionItem(value:any){
    this._bulkItems = value;
  }
  _mapCollection(data:any):Collection{
    return {
      vintageId : data.vintageId.id,
      statusId : data.statusId,
      cellarId : this.currentUser.cellar_id,
      price : data.price,
      purchaseNote : data.notes,
      bottleSize : data.format,
      locationId: 0 ,
      acquiringSourceId: data.source,
      allocationEventId: data.allocationevent?.eventId | 0,
      merchant: this._mapMerchant(),
      bottleCount: data.count,
      deliverBy: data.deliveryDate,
      purchasedOn: data.purchasedDate,
    };
  }
  _mapMerchant(): Merchant{
    //Merchant & Allocation data 
    let merchant: Merchant = {
      id: this.wineform.value?.source,
      allocationEvent: typeof this.wineform.value?.allocationevent == 'string' ?
        {name:this.wineform.value?.allocationevent} : this.wineform.value?.allocationevent
    };
    if(this._allocationId != -1){
      if(merchant.allocationEvent)
          merchant.allocationEvent.allocationId = this._allocationId;
    }
    return merchant;
  }
  onSubmitWithBulk(){
    const wines = Array
        .from(document.getElementsByClassName("bottlePrice") as HTMLCollection)
        .map((item:any) =>{
          const row =  item.closest('tr');
          return{
            id:item.dataset.value,  
            price:item.innerHTML, 
            format:row.getElementsByClassName('bottleFormat')[0].innerHTML,
            count: parseInt(row.getElementsByClassName('bottleCount')[0].innerHTML)
          }
        });
    const data:any[] = wines.map(
      (wine:any) =>{
        let data = this.wineform.value
        data.vintageId.id = wine.id
        data.format = wine.format
        data.price = wine.price
        data.count = wine.count
        return this._mapCollection(data)
      }
    );

    this.collectionService.add(JSON.parse(JSON.stringify(data))).subscribe(
      (response) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['home'],{queryParams: { view: 'cellar'}})
      }
    );
  }
  onSubmit()
  {
    const data = this._mapCollection(this.wineform.value)
    //console.log(JSON.parse(JSON.stringify(data)))
    this.collectionService.add(JSON.parse(JSON.stringify(data))).subscribe(
      (response) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['home'],{queryParams: { view: 'cellar'}})
      }
    );
  }
  
   openMerchantDialog(){
    const merchant = this.openDialog(MerchantDialogComponent,{id:this.currentUser.id}).subscribe(
      () => {
          this.merchantWithAllocation =  false;
          this.merchantService.get(this.currentUser.id).subscribe((m) => { 
          this.selectMerchant = m 
        });
      })
  }
  openAllocationDialog()
  {
    this.openDialog(AllocationDialogAddComponent,this.merchant).subscribe((response)=>{
      if(response.status == 201 && this.merchant.id){
        this.allocationService.get(this.merchant.id)
        .pipe(
          map((d:AllocationEvent[])=> d),
          catchError(err => {  return EMPTY; }))
        .subscribe((data) => this.onAllocationEvent(data));
      }
    });
  }
  openDialog<T>(component: ComponentType<T>, data:any):Observable<any>{
    return new Observable(subscriber =>{
      const dialogRef = this.dialog.open(component, {
        //width: '25%',
        data: data,
        panelClass: "dialog-responsive"
      });
      dialogRef.afterClosed().subscribe((p) => subscriber.next(p))
    })
  }
  /*onSelection(item:Vintage){
    //console.log(item)
    this.wineform.patchValue({vintageId:item})
  }*/
  onAllocate(days:number){
    const label = days == 0 ? "allocated" : "pending"
    this.wineform.patchValue({statusId:label})

    let datenow = new Date(Date.now())
    datenow.setDate(datenow.getDate() + days)
    this.wineform.get('deliveryDate')?.setValue(formatDate(datenow,'MM/dd/yyyy',this.locale))
  }
}
