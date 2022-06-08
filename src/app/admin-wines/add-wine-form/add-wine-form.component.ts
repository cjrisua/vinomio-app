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
import { WineColor, WineType } from 'src/app/app.module';

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
  index=0
  search!: OperatorFunction<string, readonly {name:string, id:number}[]>;
  Colors:any=[]
  Types:any=[]
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
    console.log(this.wineItem)
    this.wineForm = new FormGroup({
      name: new FormControl(this.wineItem?.name || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      producer: new FormControl('', [Validators.required]),
      mastervarietal: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      color: new FormControl(this.wineItem.color || '',[Validators.required]),
      type:  new FormControl(this.wineItem.color || '',[Validators.required]),
    });
    
    this.producerService.get(this.wineItem.Producer?.name).subscribe((data) => {
      this.selectProducer = data;
      if (this.wineItem) {
        const selected: Producer = this.selectProducer.filter(
          (p) => p.id == this.wineItem?.Producer?.id
        )[0];
        if (selected){
          this.wineForm.patchValue({
            producer: {name:selected.name,id:selected.id},
          });
        }
      }
    });

    this.regionService.get().subscribe((data) => {
      this.selectRegion = data;
      //console.log(this.wineItem);
      if (this.wineItem) {
        const selected: Region = this.selectRegion.filter(
          (p) => p.id == this.wineItem?.Region?.id
        )[0];
        if (selected){
          this.wineForm.patchValue({
            region: {name:selected.name,id:selected.id}
          });
        }
      }
    });

    this.mastervarietalService.get().subscribe((data) => {
      //console.log(this.wineItem);
      this.selectMastervarietal = data;
      if (this.wineItem) {
        const selected: MasterVarietal = this.selectMastervarietal.filter(
          (p) => p.id == this.wineItem?.MasterVarietal?.id
        )[0];
        if (selected)
          this.wineForm.patchValue({
            mastervarietal: {name:selected.name,id:selected.id}
          });
      }
    });
    this.Colors = this.getColors()
    this.Types = this.getTypes()
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
  onMasterVarietalFilterList(searchText:string){
    return this.mastervarietalService.get(searchText)
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
  }
  onRegionFilterList(searchText:string){
    return this.regionService.get(false,-1,searchText)
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
  }
  onProducerFilterList(searchText:string) {
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
  }
  onFilterList(control?:any){
    this.search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((searchText: string ) => {
          if(control === 'producer')
            return this.onProducerFilterList(searchText)
          else if(control === 'mastervarietal')
            return this.onMasterVarietalFilterList(searchText)
          else if(control === 'region')
            return this.onRegionFilterList(searchText)
          else
            return of([])
        }),
        catchError((e)=>{ console .log(e); return []})
      )
  }
  onClear(control:any){
    //console.log()
    this.wineForm.get(control)?.patchValue("")
  }
  debug() {
    console.debug(this.wineForm);
  }
  onSubmit() {
    let data = {
      name: this.wineForm.value.name.trim(),
      producerId: this.wineForm.value.producer.id,
      mastervarietalId: this.wineForm.value.mastervarietal.id,
      regionId: this.wineForm.value.region.id,
      type:this.wineForm.value.type.trim(),
      color:this.wineForm.value.color.trim(),
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
  onTypeChange(selection:any){
    //selection.target.value
 }
 onColorChange(selection:any){
   //console.log({color: {id:selection.target.value,name:selection.target.value}})
  //this.wineForm.patchValue({color: {id:selection.target.value,name:selection.target.value}}) 
 }
 public  getTypes(){
   return  Object.entries(WineType).map((p:any) => { return {id:p[0], name:p[1]} })
   
 }
 public getColors():{id:string,name:string}[]{
   return  Object.entries(WineColor).map((p:any) => { return {id:p[0], name:p[1]} })

 }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
}
