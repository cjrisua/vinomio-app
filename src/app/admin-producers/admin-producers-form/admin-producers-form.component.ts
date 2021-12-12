import { Component, OnInit } from '@angular/core';
import { Producer } from 'src/app/models/Producer';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { VinomioProducerService } from 'src/app/services/vinomio-producer.service';
import { map } from 'rxjs/operators'
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-producers-form',
  templateUrl: './admin-producers-form.component.html',
  styleUrls: ['./admin-producers-form.component.css']
})
export class AdminProducersFormComponent implements OnInit {
  submitted = false;
  producerForm!: FormGroup;
  
  constructor(
    private route: Router,
    private producerService: VinomioProducerService
  ) { }

  ngOnInit(): void {
    this.producerForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
    })
  }
  onSubmit() { 
    let data = {
      'name': this.producerForm.value.name
    };
    this.producerService.add(data).subscribe(
      (response) => this.route.navigateByUrl('/admin/model?id=producer')
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
