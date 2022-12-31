import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Variety } from 'src/app/models/Variety';
import { VinomioVarietyService } from 'src/app/services/vinomio-variety.service';

@Component({
  selector: 'app-admin-variety-form',
  templateUrl: './admin-variety-form.component.html',
  styleUrls: ['./admin-variety-form.component.css']
})
export class AdminVarietyFormComponent implements OnInit {

  submitted = false;
  varietyForm!: FormGroup;
  variety!:Variety

  constructor(
    private route: Router,
    private location: Location,
    private varietyService: VinomioVarietyService) { }

  ngOnInit(): void {

    const state: any = this.location.getState();
    if(state.id)
      this.variety=state

    this.varietyForm = new FormGroup({
      name:  new FormControl(this.variety?.name,[Validators.required,Validators.minLength(3)]),
    })
  }
  onSubmit() { 
    let data={"name":this.varietyForm.value.name.trim()}

    if(this.variety)
      this.varietyService.put(this.variety.id,data).subscribe((response) => this.route.navigateByUrl('/admin/variety'));
    else
      this.varietyService.add(data).subscribe((response) => this.route.navigateByUrl('/admin/variety'));
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
