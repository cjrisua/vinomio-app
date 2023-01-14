import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, startWith, Subject, tap } from 'rxjs';
import { Vintage } from 'src/app/models/Vintage';
import { Wine } from 'src/app/models/Wine';
import { VinomioVintageService } from 'src/app/services/vinomio-vintage.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-admin-vintage-form',
  templateUrl: './admin-vintage-form.component.html',
  styleUrls: ['./admin-vintage-form.component.css']
})
export class AdminVintageFormComponent implements OnInit {

  submitted = false
  vintageForm!:  FormGroup
  vintageFromCtrl = new FormControl();
  filteredOptions!: Observable<Wine[]>;
  option!:any[]
  vintage:any
  //wineVintages: Vintage[] = []
  eventsSubject:Subject<Vintage[]> =  new Subject<Vintage[]>(); 
  addedItemCollection:string[] = []
  removedItemCollection:string[] = []
  value:string =''
  
  //@Output() updateControl = new EventEmitter<Vintage[]>();
  
  constructor(
    private route: Router,
    private location: Location,
    private vintageService: VinomioVintageService,
    private wineService: VinomioWineService
  ) { }

  ngOnInit(): void {
    const state: any = this.location.getState();
    //console.log(state)
    if(state.id)
      this.vintage=state

    this.vintageForm = new FormGroup({
      wine: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required])
    });

    if(!this.vintage){
      this.wineService.get()
      .pipe(
        map((d: Wine[])=>d))
      .subscribe(data => { this.getWines(data)});
    }
    else{
      this.vintageFromCtrl.patchValue({id:this.vintage.Wine.id, name:this.vintage.Wine.name})
      this.getVintages(this.vintage.Wine.id,)
    }

  }

  getWines(data: Wine[]): void {
    this.option = data
    this.filteredOptions = this.vintageFromCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : this.displayVintages(data))
      );
  }
  getVintages(WineId:number){
    this.vintageService.getByWineId(WineId)
    .pipe(
      map((vintages:Vintage[]) => { 
        let results = []
        for(var vintage of vintages)
          results.push({id:vintage.id, name:`${vintage.year}`})
        return results
      }))
    .subscribe((d:any[])=> this.eventsSubject.next(d));
  }
  onCancel() {
    //this.route.navigateByUrl('/admin/vintage')
    //this.route.navigateByUrl('/admin/vintage')
    //console.log(this.vintage.navigation)
    if(this.vintage?.navigation)
      this.route.navigateByUrl(`/admin/${this.vintage.navigation}`)
    else 
      this.route.navigateByUrl('/admin/vintage')
  }
  onSubmit() {

    this.removedItemCollection.forEach((i,x) =>{
      //console.log(`removedItemCollection => ${x}, ${i}`)
      //this.vintageService.delete(this.vintage.id)
    })
    //console.log(this.wineVintages)
    this.addedItemCollection.forEach((year,index)=>{
      //if(index+1 == this.addedItemCollection.length)
      //console.log("done!")
      this.vintageService.add({wineId:this.vintageFromCtrl.value.id, year:year})
      .subscribe(()=>{
        if(index+1 == this.addedItemCollection.length){
          if(this.vintage?.navigation)
          this.route.navigateByUrl(`/admin/${this.vintage.navigation}`)
        else 
          this.route.navigateByUrl('/admin/vintage')
        }
      })
    })
  }
  clearTextBox(){
    //console.log(this.vintageFromCtrl)
    this.value=''
    this.vintageFromCtrl.setValue([])
  }
  displayVintages(data:any){
    this.value = "data.name"
    return this.option = data
  }
  onWineSelection(data:any){
    if(data.isUserInput)
      this.getVintages(data.source.value.id)
    
  }
  onVarietyActionEvent(event:any){
    //console.log(event)
    if(event.status ==='added'){
      if(this.removedItemCollection.includes(event.name))
        this.removedItemCollection =  this.removedItemCollection.filter(i => i != event.name)
      else
        this.addedItemCollection.push(`${event.name}`)
    }
    else if(event.status ==='removed'){
      if(this.addedItemCollection.includes(event.name))
        this.addedItemCollection =  this.addedItemCollection.filter(i => i != event.name)
      else
        this.removedItemCollection.push(`${event.name}`) 
    }
  }
  displayFn(region: Vintage):string {
    return region && region.name ? region.name : ''
  }

  private _filter(value: string) : Vintage[] {
    const filterValue = value.toLowerCase();
    return this.option.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }

}
