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
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-allocation-form',
  templateUrl: './allocation-form.component.html',
  styleUrls: ['./allocation-form.component.css'],
  providers: [DatePipe],
})
export class AllocationFormComponent implements OnInit {
  public model: Merchant | undefined;
  search!: OperatorFunction<string, readonly Merchant[]>;

  @ViewChildren('scheduleTable') container!: ElementRef;

  eventName!: any;
  @Output() ItemEvent = new EventEmitter<any>();
  userProfile!: Profile;
  allocation!: Allocation;
  //@Input() eventItem!:AllocationEvent
  allocationForm!: FormGroup;
  submitted = false;
  merchantAllocationEvents = new MatTableDataSource<any>();
  allocationMsg: string = 'No Event Found';
  displayedColumns = ['name', 'month'];
  contenteditable: boolean = true;
  merchants!: Merchant[];
 
  constructor(
    private merchantService: VinomioMerchantService,
    private allocationService: VinomioAllocationService,
    private eventService: VinomioAllocationEventService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private route:ActivatedRoute,
    private router: Router,
  ) {
    this.userProfile = this.authService.getCurrentUser()
  }

  initFormGroup(){
    this.allocationForm = new FormGroup({
      allocationId: new FormControl(),
      merchant: new FormControl('', [Validators.required]),
      userId: new FormControl(this.userProfile.id),
      status: new FormControl('', [Validators.required]),
      memberSince: new FormControl('', [Validators.required]),
      events: new FormArray([])
    });
    //const eventForm:any = this.setEventFormGroup(this.allocation?.events || [])
  }
  setEventFormGroup(events:any[]){
    let formArray = this.allocationForm.get('events') as FormArray;
    events.map((a) => {
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
    this.initFormGroup();

    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
        this.allocationService
          .getById(Number(params.get('id')))
          .subscribe((res:any) => {
            //console.log(res)
            this.allocation = res
            const date:string = this.datePipe.transform(this.allocation.memberSince,'MM/dd/yyyy') || ''
            this.allocationForm.patchValue({
              allocationId:this.allocation.id,
              userId:this.userProfile.id,
              merchant:this.allocation.merchant,
              status: this.allocation.status,
              memberSince: date,
            });
            this.setEventFormGroup(this.allocation?.events || [])
          });
      }
    });
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
  isContentEditable(element: AllocationEvent) {
    return element.eventId == -1 ? true : false;
  }
  onSubmit() {
    //alert("?")
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
    //console.log(eventItems)
    const eventItemCollection = eventItems.controls.filter(i => !i.value.eventId).map((i: any) => {
      //const data: typeof eventdata
      return {
        id: i.value.eventId,
        name: <string>i.value.name,
        month: <string>i.value.month,
      };
    });
    data = {
      merchantId: this.allocationForm.value.merchant.id,
      status: this.allocationForm.value.status,
      userId: this.allocationForm.value.userId,
      memberSince: this.allocationForm.value.memberSince,
      events: eventItemCollection,
    };
    //console.log(data)
    
    if (!this.allocationForm.value.allocationId)
      this.allocationService.add(data)
      .subscribe((res) =>  this.processResponse(res));
    else
      this.allocationService
        .patch(this.allocationForm.value.allocationId, data)
        .subscribe((res) => this.processResponse(res));
  }
  processResponse(response:any){
    //console.log(response)
    if(response.status >= 200 && response.status <= 300){
      this.router.navigate(['/allocation/mailing'],{queryParams: { action: 'List'}})
    }
  }
  onCancel() {
    //this.EmitEvent();
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
    //console.log(this.allocationForm.value)
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
