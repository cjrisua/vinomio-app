import { Component, Input, OnInit } from '@angular/core';
import { Wine } from 'src/app/models/Wine';
import { Producer } from 'src/app/models/Producer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VinomioProducerService } from 'src/app/services/vinomio-producer.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';
import { Router } from '@angular/router';
import { MasterVarietal } from 'src/app/models/MasterVarietal';
import { VinomioMastervarietalService } from 'src/app/services/vinomio-mastervarietal.service';
import { Region } from 'src/app/models/Region';
import { VinomioRegionService } from 'src/app/services/vinomio-region.service';
import { Location } from '@angular/common';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, map, Observable, of, OperatorFunction, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-wine-form',
  templateUrl: './add-wine-form.component.html',
  styleUrls: ['./add-wine-form.component.css'],
})
export class AddWineFormComponent implements OnInit {
  @Input() wineItem!: Wine;
  selectProducer: Producer[] = [];
  selectMastervarietal: MasterVarietal[] = [];
  selectRegion: Region[] = [];
  submitted = false;
  wineForm!: FormGroup;
  search!: OperatorFunction<string, readonly {name:string, id:number}[]>;
  
  constructor(
    private router: Router,
    private location: Location,
    private producerService: VinomioProducerService,
    private wineService: VinomioWineService,
    private mastervarietalService: VinomioMastervarietalService,
    private regionService: VinomioRegionService
  ) {}

  ngOnInit(): void {
    const state: any = this.location.getState();
    this.wineItem = state;

    this.wineForm = new FormGroup({
      name: new FormControl(this.wineItem?.name || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      producer: new FormControl('', [Validators.required]),
      mastervarietal: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
    });
    /*
    this.producerService.get().subscribe((data) => {
      this.selectProducer = data;
      if (this.wineItem) {
        const selected: Producer = this.selectProducer.filter(
          (p) => p.id == this.wineItem?.producer?.id
        )[0];
        if (selected)
          this.wineForm.patchValue({
            producer: selected.id,
          });
      }
    });*/

    this.regionService.get().subscribe((data) => {
      this.selectRegion = data;
      //console.log(this.wineItem);
      if (this.wineItem) {
        const selected: Region = this.selectRegion.filter(
          (p) => p.id == this.wineItem?.region?.id
        )[0];
        if (selected)
          this.wineForm.patchValue({
            region: selected.id,
          });
      }
    });

    this.mastervarietalService.get().subscribe((data) => {
      //console.log(this.wineItem);
      this.selectMastervarietal = data;
      if (this.wineItem) {
        const selected: MasterVarietal = this.selectMastervarietal.filter(
          (p) => p.id == this.wineItem?.mastervarietal?.id
        )[0];
        if (selected)
          this.wineForm.patchValue({
            mastervarietal: selected.id,
          });
      }
    });
  }
  resultFormatListValue(value: any) {
    return value.name;
  }
  inputFormatListValue(value: any) {
    if (value.name) return value.name;
    return value;
  }
  onSearchSelection(event:any){
    console.log("onSearchSelection")
  }
  onFilterList() {

    this.search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((searchText: string ) => {
          //return of([])
          return this.producerService.get(searchText)
            .pipe(
              map((producers) => {
                return producers.filter(producer => producer.name && producer.name.toLowerCase().startsWith(searchText.toLowerCase()))
              }),
              map((p)=>{
                console.log(p)
                let names:any[] = []
                p.map(p => names.push({name:p.name, id:p.id}))
                return names
              }),
              catchError(()=> EMPTY)
            )
          /*
          if(searchText.startsWith('@') && searchText.length>1)
            return this.producerService.get(searchText.replace('@',''))
              .pipe(
                map((producers) => {
                  return producers.filter(producer => producer.name && producer.name
                    .toLowerCase().startsWith(searchText.replace('@','').toLowerCase()))
                }),
                map((p)=> {
                  let names:any[] = []
                  p.map(p => names.push({name:p.name, producerId:p.id}))
                  return names
                }),
                catchError(()=> {console.log("continue.."); return EMPTY}))
          else if (searchText == "@")
            return of([])
          else
              return EMPTY */
        }),
        catchError((e)=>{ console .log(e); return []})
      )
  }
  onClear(){
    //console.log("onClear")
    this.wineForm.patchValue({producer:""})
  }
  debug() {
    console.debug(this.wineForm);
  }
  onSubmit() {
    let data = {
      name: this.wineForm.value.name.trim(),
      producerId: this.wineForm.value.producer.id,
      mastervarietalId: this.wineForm.value.mastervarietal,
      regionId: this.wineForm.value.region,
    };
    console.log(data)
    if (this.wineItem.id) {
      this.wineService
        .put(this.wineItem.id, data)
        .subscribe((response) =>
          this.router.navigateByUrl('/admin/model?name=wine')
        );
    } else {
      this.wineService
        .add(data)
        .subscribe((response) =>
          this.router.navigateByUrl('/admin/model?name=wine')
        );
    }
  }

  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
}
