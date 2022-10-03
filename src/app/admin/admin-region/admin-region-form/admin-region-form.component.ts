import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { Country } from 'src/app/models/Country';
import { Region } from 'src/app/models/Region';
import { VinomioCountryService } from 'src/app/services/vinomio-country.service';
import { VinomioRegionService } from 'src/app/services/vinomio-region.service';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-region-form',
  templateUrl: './admin-region-form.component.html',
  styleUrls: ['./admin-region-form.component.css'],
})
export class AdminRegionFormComponent implements OnInit {
  submitted = false;
  regionForm!: FormGroup;
  regionDropDowmCtrl = new FormControl();
  countrySelector!: Country[];
  filteredOptions!: Observable<Region[]>;
  countryFilterOption!: Observable<Country>;
  option!:Region[]
  region!:any

  constructor(
    private route: Router,
    private location: Location,
    private countryService: VinomioCountryService,
    private regionService: VinomioRegionService
  ) {}

  async ngOnInit(): Promise<void> {
    const state: any = this.location.getState();
    if(state.id)
      this.region=state

    this.regionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      country: new FormControl('', [Validators.required]),
    });

    this.countryService.get()
    .pipe(
      map((c: Country[]) =>c))
    .subscribe( (data: Country[]) =>  {
      this.countrySelector = data
      if(this.region){
        this.GetRegionsForCountry(this.region.country.id)
        this.regionForm.patchValue({
          country:this.region.country.id,
          name: this.region.name
        })
        if(this.region.parent?.id)
          this.regionDropDowmCtrl.patchValue({id:this.region.parent.id, name:this.region.parent.name})
      }
    })
    /*
    this.regionService.get(false,2)
    .pipe(
      map((d: Region[])=>d))
    .subscribe(data => (this.onGetParentRegion(data)));
    */
  }
  onSubmit() {
    let data:{name:string, countryId:number,parentId:any} = {
      name: this.regionForm.value.name.trim(),
      countryId: this.regionForm.value.country,
      parentId: this.regionDropDowmCtrl.value?.id
    };
    if(this.region)
      this.regionService.put(this.region.id, data).subscribe(() => this.route.navigateByUrl('/admin/model?name=region'));
    else
      this.regionService.add(data).subscribe(() => this.route.navigateByUrl('/admin/model?name=region'));
  }
  onChangeRegion(e: any){
    this.GetRegionsForCountry(e.target.value)
  }
  GetRegionsForCountry(countryId:number){
    this.regionService.get(false,countryId)
    .pipe(
      map((d: Region[])=>d))
    .subscribe(data => {
      this.onGetParentRegion(data)
    });
  }
  onGetParentRegion(data:Region[]){
    this.option = data
    this.filteredOptions = 
      this.regionDropDowmCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : this.option)
      )
  }
  displayFn(region: Region):string {
    return region && region.name ? region.name : ''
  }

  private _filter(value: string) : Region[] {
    const filterValue = value.toLowerCase();
    return this.option.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
}
