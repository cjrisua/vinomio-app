import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Variety } from 'src/app/models/Variety';
import { VinomioMastervarietalService } from 'src/app/services/vinomio-mastervarietal.service';
import { map, startWith, tap } from 'rxjs/operators';
import { VinomioVarietyService } from 'src/app/services/vinomio-variety.service';
import { MasterVarietal } from 'src/app/models/MasterVarietal';


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
  mastervarietal!:MasterVarietal
  varietyIdCollection:number[] = []
  varietyIdRemovalCollection:number[] = []
  eventsSubject:Subject<Variety[]> =  new Subject<Variety[]>(); 
  //types=[]

  constructor(
    private route: Router,
    private location: Location,
    private mastervarietalService: VinomioMastervarietalService,
    private varietiesService: VinomioVarietyService
  ) { }

  ngOnInit(): void {
    const state: any = this.location.getState();
    if(state.id)
      this.mastervarietal = state

    this.mastervarietalForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
      //color:  new FormControl('',[Validators.required]),
      //type:  new FormControl('',[Validators.required]),
    })
    this.varietiesService.get()
    .subscribe(data => {
      console.debug(this.mastervarietal)
      if(this.mastervarietal){
        console.debug("patchValue")
        this.mastervarietalForm.patchValue({name:this.mastervarietal.name})
        this.eventsSubject.next(this.mastervarietal.varieties)
      }
      return (this.onGetVarieties(data))
    });
  }
  onSubmit() { 
    console.debug(this.varietyIdCollection)
    //service data object
    const data:{name:string,varieties:number[]} = {
      name: this.mastervarietalForm.value.name.trim(),
      varieties: this.varietyIdCollection.filter( v => !this.mastervarietal?.varieties.some(i => i.id == v)) //new varieties for blend
    }
    //console.debug(data);

    this.varietyIdRemovalCollection.forEach((id) => 
        this.mastervarietalService.deleteVariety(this.mastervarietal.slug, id)
        .subscribe(() => {}))

    if(this.mastervarietal)
      this.mastervarietalService.put(this.mastervarietal.id, data).subscribe(() => this.route.navigateByUrl('/admin/mastervarietal'));
    else
      this.mastervarietalService.add(data).subscribe(() => this.route.navigateByUrl('/admin/mastervarietal'));
  }
  onVarietyActionEvent(event:any){
    if(event.status ==='added'){
      this.varietyIdCollection.push(event.id)
      if(this.varietyIdRemovalCollection.includes(event.id)){
        this.varietyIdRemovalCollection =  this.varietyIdRemovalCollection.filter(i => i != event.id)
      }
    }
    else if(event.status ==='removed'){
      this.varietyIdRemovalCollection.push(event.id) 
    }
  }
  onGetVarieties(data:Variety[]){
    this.option = data
    this.filteredOptions = this.varietyFormCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => { 
          const result = value.length >= 1 ? this._filter(value) : this.option
          return result
        })
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
