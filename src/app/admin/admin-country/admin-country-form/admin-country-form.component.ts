import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VinomioCountryService } from 'src/app/services/vinomio-country.service';
import { Location } from '@angular/common';
import { Country } from 'src/app/models/Country';

@Component({
  selector: 'app-admin-country-form',
  templateUrl: './admin-country-form.component.html',
  styleUrls: ['./admin-country-form.component.css']
})
export class AdminCountryFormComponent implements OnInit {

  submitted = false;
  countryForm!: FormGroup;
  country!: Country

  constructor(
    private route: Router,
    private location: Location,
    private countryService: VinomioCountryService
  ) { }

  ngOnInit(): void {
    const state: any = this.location.getState();
    if(state.id)
      this.country=state

    this.countryForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
    })

    if(this.country){
      this.countryForm.patchValue({
        id: this.country.id,
        name: this.country.name,
      });
    }
  }
  onSubmit() { 
   let data={"name":this.countryForm.value.name.trim()}

   if(this.country)
    this.countryService.put(this.country.id,data)
    .subscribe((response) => 
    this.route.navigateByUrl('/admin/country'));
   else
    this.countryService.add(data).subscribe(
      (response) => 
      this.route.navigateByUrl('/admin/country'));

  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
