import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Merchant } from 'src/app/models/Merchant';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioMerchantService } from 'src/app/services/vinomio-merchant.service';

@Component({
  selector: 'app-allocation-merchant',
  templateUrl: './allocation-merchant.component.html',
  styleUrls: ['./allocation-merchant.component.css'],
})
export class AllocationMerchantComponent implements OnInit {
  @Output() ItemEvent = new EventEmitter<any>();
  //userProfile!: Profile;
  //userProfileId!:string
  userProfile!:any
  merchantForm!: FormGroup;
  searchControl!: FormControl;
  merchants!: Merchant[];
  merchantSelection!: Merchant
  submitted = false;
  showMerchants = true;
  isAddMode!:boolean
  totalCount:number = 0
  search!: OperatorFunction<string, readonly Merchant[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private merchantService: VinomioMerchantService,
    private authService : AuthService
  ) {
    this.userProfile = this.authService.getCurrentUser()
  }

  ngOnInit(): void {
    this.searchControl = new FormControl();
    this.merchantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      userId: new FormControl(this.userProfile.id),
    });
    this.getUserMerchant();
    /*
    */
  }
  getUserMerchant(){
    this.merchantService
    .get(this.userProfile.id)
    .subscribe(res => {
      this.merchants=res
      this.totalCount = res.length
    });
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
            
            if(term.trim() == "")
              this.merchants = res
            
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
    
  }/*
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
  }*/
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
  deleteMerchant(merchant:any){
    this.merchantService.delete(merchant.id).subscribe(()=>console.log("done!"))
    this.getUserMerchant();
  }
  updateMerchant(merchant:any){
    //console.log(JSON.stringify(merchant))
    //this.isAddMode = false
    this.merchantSelection = merchant
    this.showMerchants = !this.showMerchants
    /*
    this.merchantForm = new FormGroup({
      id: new FormControl(merchant.id, [Validators.required]),
      name: new FormControl(merchant.name, [Validators.required]),
      userId: new FormControl(this.userProfile.id),
    });*/
  }
  EmitEvent(message: any = {}) {
    this.ItemEvent.emit(message);
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
  NavigateEventResponse(message:any){
   
    this.merchantSelection = {}

    if(message?.action && message.action == 'cancel')
      this.onCancel()
    else{
      this.getUserMerchant(); //Update Merchants
      this.addMerchant()
    }
  }
}
