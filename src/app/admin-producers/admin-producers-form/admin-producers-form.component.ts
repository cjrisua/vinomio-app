import { Component, OnInit } from '@angular/core';
import { Producer } from 'src/app/models/Producer';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { VinomioProducerService } from 'src/app/services/vinomio-producer.service';
import { map } from 'rxjs/operators'
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-producers-form',
  templateUrl: './admin-producers-form.component.html',
  styleUrls: ['./admin-producers-form.component.css']
})
export class AdminProducersFormComponent implements OnInit {
  submitted = false;
  producerForm!: FormGroup;
  producer!:Producer

  constructor(
    private router: Router,
    private location: Location,
    private producerService: VinomioProducerService
  ) { }

  ngOnInit(): void {
    const state: any = this.location.getState();
    if(state.id)
      this.producer=state
    
    this.producerForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
    })

    if(this.producer){
      this.producerForm.patchValue({
        id: this.producer.id,
        name: this.producer.name,
      });
    }
  }
  onSubmit() { 
    let data = {
      'name': this.producerForm.value.name.trim()
    };
    if(this.producer){
      this.producerService.put(this.producer.id, data).subscribe(
        (response) => this.router.navigateByUrl('/admin/producer')
      );
    }
    else{
      this.producerService.add(data).subscribe(
        (response) => this.router.navigateByUrl('/admin/producer')
      );
    }
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
  public ViewOrDeleteModelItem(wine: any) {
    //console.log(`naviage to id ${JSON.stringify(wine.event)}`);
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/wine/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.producerService.delete(wine.event.id).subscribe(() => this.ngOnInit())
  }
}
