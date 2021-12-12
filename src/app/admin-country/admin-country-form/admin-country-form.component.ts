import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VinomioCountryService } from 'src/app/services/vinomio-country.service';

@Component({
  selector: 'app-admin-country-form',
  templateUrl: './admin-country-form.component.html',
  styleUrls: ['./admin-country-form.component.css']
})
export class AdminCountryFormComponent implements OnInit {

  submitted = false;
  countryForm!: FormGroup;

  constructor(
    private route: Router,
    private countryService: VinomioCountryService
  ) { }

  ngOnInit(): void {
    this.countryForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
    })
  }
  onSubmit() { 
   let data={"name":this.countryForm.value.name}
   this.countryService.add(data).subscribe(
    (response) => this.route.navigateByUrl('/admin/model?id=country')
  );

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
