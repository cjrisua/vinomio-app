import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { Allocation } from 'src/app/models/Allocation';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { Merchant } from 'src/app/models/Merchant';
import { Wine } from 'src/app/models/Wine';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-cellar-allocation-event-view',
  templateUrl: './cellar-allocation-event-view.component.html',
  styleUrls: ['./cellar-allocation-event-view.component.css']
})
export class CellarAllocationEventViewComponent implements OnInit {

  @Input() allocation!:Allocation
  @Output() ItemEvent = new EventEmitter<any>();
  
  searchControl!: FormControl;
  eventForm!: FormGroup;

  search!: OperatorFunction<string, readonly Wine[]>
  totalCount:number = 0
  wines:Wine[] = []
  wineSelection!:Wine
  isreadonly:boolean=true
  months:string[] = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ]
  
  constructor(
    private wineService:VinomioWineService
  ) { }

  ngOnInit(): void {
    const event = this.allocation.events || [];

    this.searchControl = new FormControl();
    this.eventForm = new FormGroup({
      name: new FormControl(event[0].name),
      month: new FormControl()
    })
    this.eventForm.controls['month'].setValue(event[0].month,{onlySelf:true})

    this.wineService.get().subscribe((res) =>{
      if(res.length > 0)
      {
        this.search = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term => term.length < 1 ? []
            : res.filter(v => v.name && v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )
      }
    })
  }
  public get Event():AllocationEvent{
    return this.allocation.events ? this.allocation.events[0] : new AllocationEvent()
  }
  resultFormatListValue(value:any){
    return value.name;
  }
  inputFormatListValue(value: any)   { 
    if(value.merchant.name)
      return value.name
    return value;
  }
  onEditForm(){
    this.isreadonly=!this.isreadonly
  }
  onSearchSelection(selection:any){}
  onFilterList(){}
  onClear(){
    this.ngOnInit();
  }
  onCancel(){
    this.ItemEvent.emit();
  }
}
