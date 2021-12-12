import { Component, OnInit } from '@angular/core';
import { Wine } from 'src/app/models/Wine';
import { Producer } from 'src/app/models/Producer';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { VinomioProducerService } from 'src/app/services/vinomio-producer.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';
import {Router} from '@angular/router';
import { MasterVarietal } from 'src/app/models/MasterVarietal';

@Component({
  selector: 'app-add-wine-form',
  templateUrl: './add-wine-form.component.html',
  styleUrls: ['./add-wine-form.component.css']
})
export class AddWineFormComponent implements OnInit {

  selectProducer: Producer[] = [];
  selectMastervarietal: MasterVarietal[] = []
  submitted = false;
  wineForm!: FormGroup;

  constructor(
    private route: Router,
    private producerService: VinomioProducerService,
    private wineService: VinomioWineService
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
    let data = {
      'name': this.wineForm.value.name,
      'producerId': this.wineForm.value.producer
    };
    this.wineService.add(data).subscribe(
      (response) => this.route.navigateByUrl('/admin/model?id=wine')
    );
    
  }
  
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }

}
