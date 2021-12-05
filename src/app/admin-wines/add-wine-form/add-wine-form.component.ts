import { Component, OnInit } from '@angular/core';
import { Wine } from 'src/app/models/Wine';
import { VinomioWineService } from 'src/app/service/vinomiowine.service';
import { VinomioProducerService } from 'src/app/service/vinomioproducer.service';
import { Producer } from 'src/app/models/Producer';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-wine-form',
  templateUrl: './add-wine-form.component.html',
  styleUrls: ['./add-wine-form.component.css']
})
export class AddWineFormComponent implements OnInit {

  selectProducer: Producer[] = [];
  submitted = false;
  model: Wine = new Wine('', new Producer())
  wineForm!: FormGroup;

  constructor(
    //private wineService: VinomioWineService,
    private producerService: VinomioProducerService
    ) { }

  ngOnInit(): void {

    this.wineForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
      producer: new FormControl('',[Validators.required]),
    })

    this.producerService.getAll().subscribe(data =>{
       this.selectProducer = data
    });
  }
  onSubmit() { 
  let formdata:FormData  = new FormData();
   console.log(this.wineForm.value) 
   formdata.append('name', this.wineForm.value.name);
   formdata.append('wineId', this.wineForm.value.producer);
   //console.log(formdata.get('name')) 
    //this.submitted = true; 
    
  }
  
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }

}
