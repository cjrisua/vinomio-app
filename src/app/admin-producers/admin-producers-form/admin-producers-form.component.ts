import { Component, OnInit } from '@angular/core';
import { Producer } from 'src/app/models/Producer';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { VinomioProducerService } from 'src/app/services/vinomio-producer.service';

@Component({
  selector: 'app-admin-producers-form',
  templateUrl: './admin-producers-form.component.html',
  styleUrls: ['./admin-producers-form.component.css']
})
export class AdminProducersFormComponent implements OnInit {
  submitted = false;
  producerForm!: FormGroup;
  constructor(
    private producerService: VinomioProducerService
  ) { }

  ngOnInit(): void {
    this.producerForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
    })
  }
  onSubmit() { 
    let formdata:FormData  = new FormData();
    //formdata.append('name', this.producerForm.value.name);
    //formdata.forEach((d) => console.log("? =>" + d));
    console.log("name="+this.producerForm.value.name);
    this.producerService.add({'name': this.producerForm.value.name}).subscribe((r) => console.log(r));
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
