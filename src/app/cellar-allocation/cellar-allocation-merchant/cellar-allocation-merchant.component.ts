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
  merchants!: Merchant[];
  submitted = false;
  showMerchants = true;

  constructor(
    private route: Router,
    private merchantService: VinomioMerchantService
  ) {}

  ngOnInit(): void {
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
    //alert(JSON.stringify(data))
    this.merchantService.add(data).subscribe((result) => {
      //alert("Added")
      console.log(result)
      this.EmitEvent(result);
    });
  }
  onCancel() {
    //this.EmitEvent();
    this.addMerchant();
  }

  addMerchant(){
    this.showMerchants = !this.showMerchants
  }

  EmitEvent(message: any = {}) {
    this.ItemEvent.emit(message);
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
}
