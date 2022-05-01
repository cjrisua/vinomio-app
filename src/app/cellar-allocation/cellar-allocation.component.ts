import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Module, UserEventAction } from '../app.module';
import { Allocation } from '../models/Allocation';
import { AllocationEvent } from '../models/AllocationEvent';
import { Merchant } from '../models/Merchant';
import { Profile } from '../models/Profile';
import { VinomioAllocationService } from '../services/vinomio-allocation.service';
import { VinomioMerchantService } from '../services/vinomio-merchant.service';
import { CellarAllocationEventComponent } from './cellar-allocation-event/cellar-allocation-event.component';

export function getMonthFromString(mon:string){

  var d = Date.parse(mon + `1, ${(new Date()).getFullYear()}`);
  if(!isNaN(d)){
      return new Date(d)
  }
  return new Date();
}



@Component({
  selector: 'app-cellar-allocation',
  templateUrl: './cellar-allocation.component.html',
  styleUrls: ['./cellar-allocation.component.css']
})
export class CellarAllocationComponent implements OnInit {

  @Input() profile!:Profile
  displayedColumns=['id','name','status','memberSince','lastPurchase','action']
  allocations!:Allocation[]
  merchants!:Merchant[]
  isShow:boolean = true;
  status!:string
  //_action!:Action
  //_module!:Module
  userSelectionEvent!:UserEventAction
  //@ViewChild('appendHere',{ static: false, read: ViewContainerRef}) target!: ViewContainerRef
  private componentRef!: ComponentRef<any>;
  
  constructor(
    private allocation:VinomioAllocationService,
    private merchantService:VinomioMerchantService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
  ) { 
    //this._action = Action.Default
  }
  
  ngOnInit(): void {
      this.allocation.get(this.profile.id)
      .subscribe(results => { 
        this.allocations = results;
      });
      this.merchantService.get(this.profile.id)
      .subscribe(results => this.merchants = results);
      this.status = "show"
  }
  public get Action(): typeof Action {
    return Action;
  }
  public get MerchantCount(){
    return this.merchants ? this.merchants.length : 0
  }
  public get AllocationCount(){
    return this.allocations ? this.allocations.length : 0
  }
  public get ActiveAllocationCount(){
    return this.allocations ? this.allocations.filter(a => a.status == "Active").length : 0
  }
  public get RollingAllocationCount(){
    
    let upcomingEventCollection:AllocationEvent[] = []

    if(this.allocations){
      //console.log("?")
      this.allocations
      .filter(a => a.status == "Active" && a.events)
      .map((a) => {
        const upcomingEvents = a.events?.filter(e => {
           const currentDate = getMonthFromString(new Date().toLocaleString('default', { month: 'long' }));
           const eventDate = getMonthFromString(e.month ? e.month : "");
           const futureDate = new Date(new Date().setDate(new Date().getDate()+90))
           if(eventDate > currentDate && eventDate < futureDate){
              upcomingEventCollection.push(e)
           }
           //console.log("future offer" + e.month)
           //console.log(new Date().toString())
          })

      })
    }
    //this.allocations ? this.allocations.filter(a => {
    //  return a.status == "Active" 
    //})
    return upcomingEventCollection.length;
  }

  NavigateEventResponse(message:any){
    //alert("?")
    //console.debug(JSON.stringify(message))
    //this._action == Action.Default
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home'], {
        queryParams: { view: 'allocation' },
      });
  }
  onMerchantAction(action:Action){
    this.userSelectionEvent = new UserEventAction(Action[action],Module.Merchant)
    
  }
  onAllocationAction(action:Action){
    this.userSelectionEvent = new UserEventAction(Action[action],Module.Allocation)
  }
  addNewComponent(event:any,data:any){
    console.debug(JSON.stringify(data));
    const row = document.getElementsByClassName("row"+event)[0];
    if(row.hasAttribute("selected")){
      row.getElementsByClassName("status")[0].innerHTML="show"
      row.removeAttribute("selected")
      row.nextSibling?.remove();
      return;
    }
    row.getElementsByClassName("status")[0].innerHTML="hide" 
    row.setAttribute("selected","")

    let childComponent = this.componentFactoryResolver.resolveComponentFactory(CellarAllocationEventComponent);
    this.componentRef = this.viewContainerRef.createComponent(childComponent);

    this.componentRef.instance.MerchantId = data.merchantId
    const loaderComponentElement = this.componentRef.location.nativeElement;
    row.after((<HTMLElement>loaderComponentElement).children[0])
  }
}
