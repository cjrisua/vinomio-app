import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { Action, Module, UserEventAction } from 'src/app/app.module';
import { Allocation } from 'src/app/models/Allocation';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { Merchant } from 'src/app/models/Merchant';
import { Profile } from 'src/app/models/Profile';
import { VinomioAllocationService } from 'src/app/services/vinomio-allocation.service';

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

  constructor(
    private allocationService:VinomioAllocationService
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl();
    this.showView = this.action.Action == Action.List ? true : false
    this.allocationService.get(this.userProfile.id).subscribe(
      (allocations)=>{
        this.allocations = allocations
        //console.log(allocations)
      })
  }
  onEventView(allocation:Allocation, event:AllocationEvent){
    this.showView = false
    this.action =  new UserEventAction(Action.List,Module.AllocationEvent)
    const tempAllocation:Allocation = {...allocation}
    tempAllocation.events = [];
    tempAllocation.events.push(event);
    this.allocationSelection = tempAllocation
   
    //this.merchantSelection = merchant
  }
  onAddAllocation(){
    this.showView = false
  }
  resultFormatListValue(value: any) {          
    return value.merchant.name;
  }
  NavigateEventResponse(event:any){
  this.action =  new UserEventAction(Action.List,Module.Allocation)
   this.showView = !this.showView

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
}
