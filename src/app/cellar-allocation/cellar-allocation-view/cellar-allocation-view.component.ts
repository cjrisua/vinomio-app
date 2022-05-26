import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, map, Observable, of, OperatorFunction } from 'rxjs';
import { Action, Module, UserEventAction } from 'src/app/app.module';
import { Allocation } from 'src/app/models/Allocation';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { Collection } from 'src/app/models/Collection';
import { Merchant } from 'src/app/models/Merchant';
import { Profile } from 'src/app/models/Profile';
import { VinomioAllocationService } from 'src/app/services/vinomio-allocation.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';

@Component({
  selector: 'app-cellar-allocation-view',
  templateUrl: './cellar-allocation-view.component.html',
  styleUrls: ['./cellar-allocation-view.component.css']
})
export class CellarAllocationViewComponent implements OnInit {

  @Output() ItemEvent = new EventEmitter<any>();
  @Input() userProfile!:Profile;
  @Input() action!:UserEventAction;
  showView = true;
  searchControl!: FormControl;
  search!: OperatorFunction<string, readonly Allocation[]>
  totalCount:number = 0
  allocations:Allocation[] = []
  allocationSelection!:Allocation
  merchantSelection!:Merchant
  allocationEventSelection!:AllocationEvent
  lastPurchasedOn:any[] =[]
  constructor(
    private allocationService:VinomioAllocationService
    //private allocation
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl();
    this.showView = this.action.Action == Action.List ? true : false
    this.getAllocation();
  }
  public purchaseAllocation(allocation:any, event:any){
    event.cancelBubble = true;
    if(event.stopPropagation) event.stopPropagation();
    this.allocationEventSelection = event;
    this.allocationSelection = allocation;
    this.showView = false
    this.action =  new UserEventAction(Action.Add,Module.AllocationPurchase)
  }
  private getAllocation(){
    
    this.allocationService.get(this.userProfile.id)
    .pipe(
      map((d:Allocation[])=> d),
      catchError((val)=> of([])))
    .subscribe(
      (allocations)=>{
        console.debug("setting allocations...")
        this.allocations = allocations
        this.totalCount = allocations.length
        this.getUserLastAllocations();
      })
  }
  public offerPriceAverage(event:any){
    //console.log(event)
    return event.AllocationEventOffers.reduce((sum:number,current:any)=>{
      const total = Number(sum) + (Number(current.releasePrice) * current.minimum)
      return total
    },0)
  } 
  public bottleCount(event:any){
    return event.AllocationEventOffers.length;
  }
  onEventView(allocation:Allocation, event:AllocationEvent){
    this.showView = false
    this.action =  new UserEventAction(Action.List,Module.AllocationEvent)
    const tempAllocation:Allocation = {...allocation}
    tempAllocation.events = [];
    tempAllocation.events.push(event);
    this.allocationSelection = tempAllocation
    //console.log("onEventView")
    //this.merchantSelection = merchant
  }
  onAddAllocation(){
    this.showView = false
  }
  resultFormatListValue(value: any) {          
    return value.merchant.name;
  }
  NavigateEventResponse(event:any){
    if(event?.action && event.action === 'redirect'){
      this.onEventView(event.allocation, event.event)
      return
    }
    this.allocationSelection = {}
    this.action =  new UserEventAction(Action.List,Module.Allocation)
    this.showView = !this.showView
    this.getAllocation();
    //this.getUserLastAllocations()
  }
  inputFormatListValue(value: any)   { 
    if(value.merchant.name)
      return value.merchant.name
    return value;
  }
  onSearchSelection(selection:any){

  }
  onFilterList(){
    this.allocationService
    .get(this.userProfile.id)
    .subscribe( res => {
      if(res.length > 0){
        this.search = (text$: Observable<string>) => text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term => {
            const matches = term.length < 1 ? []
            : res.filter(v => v.merchant?.name && v.merchant.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
            this.allocations = matches
            if(term.trim() == "")
              this.allocations = res
            return matches
          })
        )
      }
    })
  }
  onClear(){
    this.ngOnInit();
  }
  onDelete(allocation:any){
    console.log(allocation)
    this.allocationService.delete(allocation.id).subscribe((e)=> { 
      console.log("done...now refresh")
      this.getAllocation() 
    })
  }
  onViewItem(allocation:any){
    //console.log(allocation)
    this.allocationSelection = allocation
    this.showView = !this.showView
    
  }
  private getUserLastAllocations(){
  //console.log(this.userProfile)
   this.allocationService.getLastPurchases(this.userProfile.cellar_id).subscribe(r =>this.lastPurchasedOn = r)
  }
  public getLastPurchase(event:any){
    //console.log(event)
    if(this.lastPurchasedOn){
      const dates:any=this.lastPurchasedOn.filter(p => p.allocationEventId == event.id).map((e) => new Date(e.lastPurchased))
      if(dates.length>0){
        //console.log(`${event.id} => ${dates}`)
        return new Date(Math.max(...dates))}
      //else
        //console.log("Empty")
    }
    return
  }
}
