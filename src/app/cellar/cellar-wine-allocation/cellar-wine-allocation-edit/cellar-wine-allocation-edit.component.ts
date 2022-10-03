import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-cellar-wine-allocation-edit',
  templateUrl: './cellar-wine-allocation-edit.component.html',
  styleUrls: ['./cellar-wine-allocation-edit.component.css']
})
export class CellarWineAllocationEditComponent implements OnInit {

  @Input() currentUser!:Profile
  @Output() actionEvent =  new EventEmitter<{}>();
  submitted:boolean = false
  itemForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.itemForm = new FormGroup({})
  }
  NavigateBack(){
    this.actionEvent.emit({})
  }
  onSubmit() { }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
