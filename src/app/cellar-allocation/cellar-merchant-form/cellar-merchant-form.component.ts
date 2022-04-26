import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  OperatorFunction,
  switchMap,
  throwError,
} from 'rxjs';
import { Merchant } from 'src/app/models/Merchant';
import { Producer } from 'src/app/models/Producer';
import { Profile } from 'src/app/models/Profile';
import { VinomioMerchantService } from 'src/app/services/vinomio-merchant.service';
import { VinomioProducerService } from 'src/app/services/vinomio-producer.service';

@Component({
  selector: 'app-cellar-merchant-form',
  templateUrl: './cellar-merchant-form.component.html',
  styleUrls: ['./cellar-merchant-form.component.css'],
})
export class CellarMerchantFormComponent implements OnInit {
  @Input() userProfile!: Profile;
  @Output() ItemEvent = new EventEmitter<any>();
  submitted = false;
  merchantForm!: FormGroup;

  //merchants: {name:string, producerId:number}[] = []
  search!: OperatorFunction<string, readonly {name:string, producerId:number}[]>;

  constructor(
    private route: Router,
    private merchantService: VinomioMerchantService,
    private producerService: VinomioProducerService
    ) {}

  ngOnInit(): void {

    this.merchantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      userId: new FormControl(this.userProfile.id),
    });
  }
  onCancel() {
    this.EmitEvent({ action: 'cancel' });
    //this.addMerchant();
  }
  EmitEvent(message: any = {}) {
    this.ItemEvent.emit(message);
  }
  resultFormatListValue(value: any) {
    if (value.name) 
    return value.name;
  return value;
  }
  onMerchantSelection(selection: any) {
    //this.merchantForm.patchValue({name:"test"})
    //console.log(selection.item)
    //console.log(this.merchantForm.value.name)
  }
  onFilterMerchantList() {

    this.search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((searchText: string ) => {
          if(searchText.startsWith('@') && searchText.length>1)
            return this.producerService.get(searchText.replace('@',''))
              .pipe(
                map((producers) => {
                  return producers.filter(producer => producer.name
                    .toLowerCase().startsWith(searchText.replace('@','').toLowerCase()))
                }),
                map((p)=> {
                  let names:any[] = []
                  p.map(p => names.push({name:p.name, producerId:p.id}))
                  return names
                }),
                catchError(()=> {console.log("continue.."); return EMPTY}))
          else if (searchText == "@")
            return of([])
          else
              return EMPTY 
        }),
        catchError(()=>{ console .log("here"); return []})
      )
  }
  inputFormatListValue(value: any) {
    if (value.name) 
      return value.name;
    return value;
  }
  onSubmit() {
    let data: { userId: string; name: string, producerId: number };
    data = { 
      userId: this.merchantForm.value.userId, 
      name:this.merchantForm.value.name?.name || this.merchantForm.value.name,
      producerId:this.merchantForm.value.name?.producerId}
    data.producerId =  this.merchantForm.value.name.producerId;

    //console.log(data)
    
    this.merchantService.add(data).subscribe(
      (response) =>  this.EmitEvent(response)
    );
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
  onClear(){

  }
}
