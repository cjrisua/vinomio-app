import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-cellar-merchant-form',
  templateUrl: './cellar-merchant-form.component.html',
  styleUrls: ['./cellar-merchant-form.component.css']
})
export class CellarMerchantFormComponent implements OnInit {
  @Input() userProfile!: Profile;
  @Output() ItemEvent = new EventEmitter<any>();
  submitted = false;
  merchantForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.merchantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      userId: new FormControl(this.userProfile.id),
    });
  }
  onCancel() {
    this.EmitEvent({action:'cancel'});
    //this.addMerchant();
  }
  EmitEvent(message: any = {}) {
    this.ItemEvent.emit(message);
  }
  onSubmit() {
    
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
}
