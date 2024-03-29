import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, map, Observable, of, OperatorFunction } from 'rxjs';
import { Action, Module, Months, UserEventAction } from 'src/app/app.module';
import { Allocation } from 'src/app/models/Allocation';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { Collection } from 'src/app/models/Collection';
import { Merchant } from 'src/app/models/Merchant';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioAllocationEventService } from 'src/app/services/vinomio-allocation-event.service';
import { VinomioAllocationService } from 'src/app/services/vinomio-allocation.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';

@Component({
  selector: 'app-allocation-view',
  templateUrl: './allocation-view.component.html',
  styleUrls: ['./allocation-view.component.css']
})
export class AllocationViewComponent implements OnInit {

  @Output() ItemEvent = new EventEmitter<any>();
  userProfile!:Profile;
  @Input() action!:UserEventAction
  //action!:UserEventAction
  userAction!: Action
  //showView = true;
  searchControl!: FormControl;
  search!: OperatorFunction<string, readonly Allocation[]>
  totalCount:number = 0
  allocations:Allocation[] = []
  allocationSelection!:Allocation
  merchantSelection!:Merchant
  allocationEventSelection!:AllocationEvent
  lastPurchasedOn:any[] =[]
  constructor(
    private allocationService:VinomioAllocationService,
    private eventService:VinomioAllocationEventService,
    private authService: AuthService,
    private route:ActivatedRoute,
    private router: Router,
  ) { 
    this.userProfile = this.authService.getCurrentUser()
    this.route.queryParams.subscribe((params:any) => {
        const action:string = params.action
        this.userAction = (<any>Action)[action]
      })
  }

  ngOnInit(): void {
    this.searchControl = new FormControl();
    //this.showView = this.userAction == Action.List ? true : false
    this.getAllocation();
  }
  public purchaseAllocation(allocation:any, event:any){
    //event.cancelBubble = true;
    //if(event.stopPropagation) event.stopPropagation();
    //this.allocationEventSelection = event;
    //this.allocationSelection = allocation;
    //this.showView = false
    //this.action =  new UserEventAction(Action.Add,Module.AllocationPurchase)
  }
  private getAllocation(){
    
    this.allocationService.get(this.userProfile.id)
    .pipe(
      map((d:Allocation[])=> this._sort(d)),
      catchError((val)=> of([])))
    .subscribe(
      (allocations)=>{
        //console.debug(allocations)
        this.allocations = allocations
        this.totalCount = allocations.length
        this.getUserLastAllocations();
      })
  }
  
  private _sort(allocation:Allocation[]){
    //get month
    let month_now:number = new Date().getMonth() + 1
    //int array of months by proximity
    const monthSortFilter:number[] = [...new Set(Array(14).join(".").split(".").map(i => { return  month_now < 13 ? month_now++ : (month_now=1) }))]
    allocation.map(a =>{
      a.events?.sort((e1:AllocationEvent,e2:AllocationEvent) => {
        const month1:number = monthSortFilter.indexOf(Number(Months[<any>e1.month]))
        const month2:number = monthSortFilter.indexOf(Number(Months[<any>e2.month]))
        //console.log(`${month1} ${month2}`)
        return month1 > month2 ? 1 : -1
      })
    })
    allocation.sort((a:any,b:any) => {
        const month1:number = monthSortFilter.indexOf(Number(Months[<any>a.events[0].month||0]))
        const month2:number = monthSortFilter.indexOf(Number(Months[<any>b.events[0].month||0]))
        //console.log(`${month1} ${month2}`)
        return month1 > month2 ? 1 : -1
    })
    return allocation
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
    //this.showView = false
    //this.action =  new UserEventAction(Action.List,Module.AllocationEvent)
    //const tempAllocation:Allocation = {...allocation}
    //tempAllocation.events = [];
    //tempAllocation.events.push(event);
    //this.allocationSelection = tempAllocation
    //console.log("onEventView")
    //console.debug(allocation)
    //console.debug(event)
    //this.merchantSelection = merchant
  }
  //onAddAllocation(){
    //this.showView = false
  //}
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
    //this.showView = !this.showView
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
  onDeleteEvent(event:any){
    this.eventService.delete(event.id)
    .subscribe((resp) => {
      if(resp.status == 204){
        //console.log("done2")
        this.getAllocation()
        let object = this.allocations.filter(p=>p.id == event.allocationId)[0]
        object.events = object.events?.filter((i:any)=>i.id != event.id)
        this.router.navigate(['/allocation/mailing'],{queryParams: { action: 'List'}})
      }
    })
  }
  onDelete(allocation:any){
    //console.log(allocation)
    this.allocationService.delete(allocation.id).subscribe((resp)=> { 
      if(resp.status == 204){
        //console.log("done!")
        this.getAllocation()
        //this.allocations = this.allocations.filter(p=>p.id != allocation.id)
        this.router.navigate(['/allocation/mailing'],{queryParams: { action: 'List'}})
      }
    })
  }
  onViewItem(allocation:any){
    console.log("onViewItem")
    //this.allocationSelection = allocation
    //this.showView = !this.showView
    
  }
  private getUserLastAllocations(){
  //console.log(this.userProfile)
   this.allocationService.getLastPurchases(this.userProfile.cellar).subscribe(r =>this.lastPurchasedOn = r)
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
