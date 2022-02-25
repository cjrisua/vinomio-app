import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Allocation } from '../models/Allocation';
import { Profile } from '../models/Profile';
import { VinomioAllocationService } from '../services/vinomio-allocation.service';
import { CellarAllocationEventComponent } from './cellar-allocation-event/cellar-allocation-event.component';

export class UserEventAction{
  _action!:Action;
  _module!:Module;
  constructor(
    private action:Action,
    private module:Module
  ){
    this._action = action;
    this._module = module;
  }
  public get EnumAction(): typeof Action{
    return Action
  }
  public get Action(): Action{
    return this._action;
  } 
  public get EnumModule(): typeof Module{
    return Module
  }
  public get Module(): Module{
    return this._module;
  }
}
export enum Action{
  Add ='Add',
  Edit ='Edit',
  Default ='Default'
}
export enum Module{
  Merchant = 'Merchant',
  Allocation = 'Allocation'
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
  dataSource = new MatTableDataSource<Allocation>();
  isShow:boolean = true;
  status!:string
  //_action!:Action
  //_module!:Module
  userSelectionEvent!:UserEventAction
  //@ViewChild('appendHere',{ static: false, read: ViewContainerRef}) target!: ViewContainerRef
  private componentRef!: ComponentRef<any>;
  
  constructor(
    private allocation:VinomioAllocationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
  ) { 
    //this._action = Action.Default
  }
  
  ngOnInit(): void {
      this.allocation.get(this.profile.id)
      .subscribe(results => { 
        this.dataSource.data = results;
        this.allocations = results;
      });
      this.status = "show"
  }
  NavigateEventResponse(message:any){
    console.debug(JSON.stringify(message))
    //this._action == Action.Default
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home'], {
        queryParams: { view: 'allocation' },
      });
  }
  onMerchantAction(){
    this.userSelectionEvent = new UserEventAction(Action.Add,Module.Merchant)
    
  }
  onAllocationAction(){
    this.userSelectionEvent = new UserEventAction(Action.Add,Module.Allocation)
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
