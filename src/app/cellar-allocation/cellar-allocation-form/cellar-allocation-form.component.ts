import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  fromEvent,
  EMPTY,
  Observable,
  OperatorFunction,
  Subscription,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { Merchant } from 'src/app/models/Merchant';
import { Profile } from 'src/app/models/Profile';
import { VinomioAllocationEventService } from 'src/app/services/vinomio-allocation-event.service';
import { VinomioAllocationService } from 'src/app/services/vinomio-allocation.service';
import { VinomioMerchantService } from 'src/app/services/vinomio-merchant.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Allocation } from 'src/app/models/Allocation';

@Component({
  selector: 'app-cellar-allocation-form',
  templateUrl: './cellar-allocation-form.component.html',
  styleUrls: ['./cellar-allocation-form.component.css'],
  providers: [DatePipe],
})
export class CellarAllocationFormComponent implements OnInit {
  public model: Merchant | undefined;
  search!: OperatorFunction<string, readonly Merchant[]>;
  /*
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  */

  @ViewChildren('scheduleTable') container!: ElementRef;

  eventName!: any;
  @Output() ItemEvent = new EventEmitter<any>();
  @Input() userProfile!: Profile;
  @Input() allocation!: Allocation;
  //@Input() eventItem!:AllocationEvent
  allocationForm!: FormGroup;
  submitted = false;
  merchantAllocationEvents = new MatTableDataSource<any>();
  allocationMsg: string = 'No Event Found';
  displayedColumns = ['name', 'month'];
  contenteditable: boolean = true;
  merchants!: Merchant[];
  //dataSource:AllocationEvent[] = [{name: "Spring Release", month:"January"},{name: "Spring Release", month:"January"}];
  constructor(
    private merchantService: VinomioMerchantService,
    private allocationService: VinomioAllocationService,
    private eventService: VinomioAllocationEventService,
    private datePipe: DatePipe
  ) {}

  initFormGroup(){
    this.allocationForm = new FormGroup({
      allocationId: new FormControl([]),
      merchant: new FormControl('', [Validators.required]),
      userId: new FormControl(this.userProfile.id),
      status: new FormControl('', [Validators.required]),
      memberSince: new FormControl('', [Validators.required]),
      events: new FormArray([])
    });
    const eventForm:any = this.setEventFormGroup(this.allocation?.events || [])
  }
  setEventFormGroup(events:any[]){
    let formArray = this.allocationForm.get('events') as FormArray;
    events.map((a) => {
      //console.log(a.name)
        formArray.push(
          new FormGroup({
            name: new FormControl(a.name, []),
            month: new FormControl(a.month, []),
            eventId: new FormControl(a.id, []),
          }));
        this.merchantAllocationEvents = new MatTableDataSource(formArray.controls);
      });
  }
  ngOnInit(): void {
    //console.log(this.allocation)
    this.initFormGroup();

    if (this.allocation) {
      const date:string = this.datePipe.transform(this.allocation?.memberSince,'MM/dd/yyyy') || ''
      console.log(this.allocation.events)
      this.allocationForm.patchValue({
        merchant:this.allocation.merchant?.name,
        status: this.allocation.status,
        memberSince: date,
        //events: this.allocation.events
      });
    }else {
      /*
      this.merchantService.get(this.userProfile.id).subscribe((res) => {
        if (res.length > 0) {
          this.search = (text$: Observable<string>) =>
            text$.pipe(
              debounceTime(200),
              distinctUntilChanged(),
              map((term) =>
                term.length < 1 ? [] : res.filter((v) => v.name && v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
              ));
        }});*/
    }
  }
  onClearForm() {
    this.initFormGroup();
  }
  resultFormatBandListValue(value: any) {
    return value.name;
  }
  inputFormatBandListValue(value: any) {
    if (value.name) return value.name;
    return value;
  }
  onFilterMerchantList(){
    this.merchantService
    .get(this.userProfile.id)
    .subscribe(res =>{
      if(res.length > 0){
        this.search = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term => { 
            const matches = term.length < 1 ? []
            : res.filter(v => v.name && v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
            this.merchants = matches
            
            if(term.trim() == "")
              this.merchants = res
            
            return matches
          })
        )
      }
    });
  }
  onMerchantSelection(selection: any) 
  {
    /*
    this.allocationForm.reset();
    this.merchantAllocationEvents = new MatTableDataSource<any>();

    //console.log(selection.item.id)
    if (selection.item.id)
      this.eventService
        .get(selection.item.id)
        .pipe(
          map((d: any[]) => d),
          catchError((err) => {
            this.merchantAllocationEvents = new MatTableDataSource<any>();
            return EMPTY;
          })
        )
        .subscribe((allocations: any[]) => {
          //console.log(allocations[0].allocationId)
          const allocation = allocations[0].allocation;
          //console.debug(allocation)
          this.allocationForm.patchValue({
            allocationId: allocations[0].allocationId,
            status: allocation?.status,
            memberSince: this.datePipe.transform(
              allocation?.memberSince,
              'MM/dd/yyyy'
            ),
          });
          //this.merchantAllocationEvents =
          let formArray = this.allocationForm.get('events') as FormArray;
          allocations.map((a) => {
            formArray.push(
              new FormGroup({
                name: new FormControl(a.name, []),
                month: new FormControl(a.month, []),
                eventId: new FormControl(a.eventId, []),
              })
            );
            this.merchantAllocationEvents = new MatTableDataSource(
              formArray.controls
            );
          });
        });*/
  }
  isContentEditable(element: AllocationEvent) {
    return element.eventId == -1 ? true : false;
  }
  onSubmit() {
    //console.log(JSON.stringify(this.allocationForm.value))
    let eventdata: { id: number; name: string; month: string };
    let data: {
      merchantId: number;
      status: String;
      userId: number;
      memberSince: string;
      events?: typeof eventdata[];
    };

    let eventItems = this.allocationForm.get('events') as FormArray;
    const eventItemCollection = eventItems.controls.map((i: any) => {
      //const data: typeof eventdata
      return {
        id: i.value.eventId,
        name: <string>i.value.name,
        month: <string>i.value.month,
      };
    });
    //console.log(eventItemCollection);
    data = {
      merchantId: this.allocationForm.value.merchant.id,
      status: this.allocationForm.value.status,
      userId: this.allocationForm.value.merchant.userId,
      memberSince: this.allocationForm.value.memberSince,
      events: eventItemCollection,
    };
    if (!this.allocationForm.value.allocationId)
      this.allocationService.add(data).subscribe((p) => this.EmitEvent(p));
    else
      this.allocationService
        .patch(this.allocationForm.value.allocationId, data)
        .subscribe((p) => this.EmitEvent(p));
  }
  onCancel() {
    this.EmitEvent();
  }
  onRowClick(column: any, rowid: any) {
    //console.log(rowid)
    if ((<HTMLElement>column).innerHTML == '') {
      let sel = window.getSelection();
      sel?.collapse(<HTMLElement>column, 0);
    }
  }
  onViewEventClick(selection:any){
    this.ItemEvent.emit({action:'redirect',allocation:this.allocation, event:this.allocation.events?.filter(i => i.id === selection)[0]});
  }
  onAddAllocationSchedule() {
    let formArray = this.allocationForm.get('events') as FormArray;
    formArray.push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        month: new FormControl(null, [Validators.required]),
        eventId: new FormControl(null, []),
      })
    );
    this.merchantAllocationEvents = new MatTableDataSource(formArray.controls);
  }
  EmitEvent(message: any = {}) {
    this.ItemEvent.emit(message);
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
  get eventCount(): number {
    let formArray = this.allocationForm.get('events') as FormArray;
    return formArray?.length;
  }
}
