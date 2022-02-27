import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Merchant } from 'src/app/models/Merchant';
import { Profile } from 'src/app/models/Profile';
import { VinomioMerchantService } from 'src/app/services/vinomio-merchant.service';

@Component({
  selector: 'app-cellar-allocation-merchant',
  templateUrl: './cellar-allocation-merchant.component.html',
  styleUrls: ['./cellar-allocation-merchant.component.css'],
})
export class CellarAllocationMerchantComponent implements OnInit {
  @Output() ItemEvent = new EventEmitter<any>();
  @Input() userProfile!: Profile;
  merchantForm!: FormGroup;
  searchControl!: FormControl;
  merchants!: Merchant[];
  submitted = false;
  showMerchants = true;
  isAddMode!:boolean
  search!: OperatorFunction<string, readonly Merchant[]>

  constructor(
    private route: Router,
    private merchantService: VinomioMerchantService
  ) {}

  ngOnInit(): void {
    this.searchControl = new FormControl();
    this.merchantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      userId: new FormControl(this.userProfile.id),
    });
    this.merchantService
    .get(this.userProfile.id)
    .subscribe(res => this.merchants=res);
    /*
    */
  }
  resultFormatListValue(value: any) {            
    return value.name;
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
            console.log(matches)
            return matches
          })
        )
      }
    });
  }
  inputFormatListValue(value: any)   {
    if(value.name)
      return value.name
    return value;
  }
  onMerchantSelection(selection:any){
    
  }
  onSubmit() {
    let data: { userId: string; name: string };
    data = this.merchantForm.value;
    //alert(JSON.stringify(this.merchantForm.value))
    if(!this.merchantForm.value.id){
      this.merchantService.add(data).subscribe((result) => {
        //alert("Added")
        //console.log(result)
        this.EmitEvent(result);
      });
    }
    else
    {
      this.merchantService.put(this.merchantForm.value.id,data).subscribe((result) => {
        //alert("Added")
        //console.log(result)
        this.EmitEvent(result);
      });
    }
  }
  onClear(){
    this.ngOnInit()
  }
  onCancel() {
    //this.EmitEvent();
    this.addMerchant();
  }

  addMerchant(){
    //this.isAddMode = true
    this.showMerchants = !this.showMerchants
  }
  updateMerchant(merchant:any){
    //this.isAddMode = false
    this.showMerchants = !this.showMerchants
    this.merchantForm = new FormGroup({
      id: new FormControl(merchant.id, [Validators.required]),
      name: new FormControl(merchant.name, [Validators.required]),
      userId: new FormControl(this.userProfile.id),
    });
  }
  EmitEvent(message: any = {}) {
    this.ItemEvent.emit(message);
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
}
