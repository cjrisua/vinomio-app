import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      .subscribe((r) => (this.merchants = r));
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
    this.searchControl.reset()
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
