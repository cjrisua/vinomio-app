import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VinomioVarietyService } from 'src/app/services/vinomio-variety.service';

@Component({
  selector: 'app-admin-variety-form',
  templateUrl: './admin-variety-form.component.html',
  styleUrls: ['./admin-variety-form.component.css']
})
export class AdminVarietyFormComponent implements OnInit {

  submitted = false;
  varietyForm!: FormGroup;

  constructor(
    private route: Router,
    private varietyService: VinomioVarietyService) { }

  ngOnInit(): void {
    this.varietyForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
    })
  }
  onSubmit() { 
    let data={"name":this.varietyForm.value.name.trim()}
    this.varietyService.add(data).subscribe(
     (response) => this.route.navigateByUrl('/admin/model?name=variety')
   );
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
