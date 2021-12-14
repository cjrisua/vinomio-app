import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Variety } from 'src/app/models/Variety';
import { VinomioMastervarietalService } from 'src/app/services/vinomio-mastervarietal.service';
import { map, startWith, tap } from 'rxjs/operators';
import { VinomioVarietyService } from 'src/app/services/vinomio-variety.service';
import { CoreAreaTextboxComponent } from 'src/app/core/core-area-textbox/core-area-textbox.component';

@Component({
  selector: 'app-admin-mastervarietal-form',
  templateUrl: './admin-mastervarietal-form.component.html',
  styleUrls: ['./admin-mastervarietal-form.component.css']
})
export class AdminMastervarietalFormComponent implements OnInit {

  submitted = false;
  mastervarietalForm!: FormGroup;
  varietyFormCtrl = new FormControl();
  filteredOptions!: Observable<Variety[]>;
  option!:Variety[]
  varietyIdCollection:any = []

  constructor(
    private route: Router,
    private mastervarietalService: VinomioMastervarietalService,
    private varietiesService: VinomioVarietyService
  ) { }

  ngOnInit(): void {
    this.mastervarietalForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
    })
    this.varietiesService.get()
    .pipe(
      map((d: Variety[])=>d))
    .subscribe(data => (this.onGetVarieties(data)));
  }
  onSubmit() { 
    let data={
      name:this.mastervarietalForm.value.name,
      varieties:this.varietyIdCollection
    }
    this.mastervarietalService.add(data).subscribe(
     (response) => this.route.navigateByUrl('/admin/model?id=mastervarietal')
   );
  }
  onVarietyAdded(action:any){
     this.varietyIdCollection.push(action.id)
  }
  onGetVarieties(data:Variety[]){
    this.option = data
    this.filteredOptions = this.varietyFormCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : this.option)
      );
  }
  displayFn(region: Variety):string {
    return region && region.name ? region.name : ''
  }

  private _filter(value: string) : Variety[] {
    const filterValue = value.toLowerCase();
    return this.option.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
