import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  wineVintages: Vintage[] = []
  eventsSubject:Subject<Vintage[]> =  new Subject<Vintage[]>(); 

  value:string =''
  
  //@Output() updateControl = new EventEmitter<Vintage[]>();
  
  constructor(
    private route: Router,
    private vintageService: VinomioVintageService,
    private wineService: VinomioWineService
  ) { }

  ngOnInit(): void {
    this.vintageForm = new FormGroup({
      wine: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required])
    });
    this.wineService.get()
    .pipe(
      map((d: Wine[])=>d))
    .subscribe(data => (this.getVintage(data)));
  }

  getVintage(data: Wine[]): void {
    this.option = data
    this.filteredOptions = this.vintageFromCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : this.displayVintages(data))
      );
  }
  onSubmit() {
    //let data = { id:this.vintageFromCtrl.value.id }
    this.wineVintages.forEach(vintage=>{
      this.vintageService.add({wineId:this.vintageFromCtrl.value.id, year:vintage})
      .subscribe(()=>this.route.navigateByUrl('/admin/model?name=vintage'))
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
    if(data.isUserInput){
      const id:number = data.source.value.id
      this.vintageService.getByWineId(id)
      .pipe(
        map((vintages:Vintage[]) => { 
          let results = []
          for(var vintage of vintages)
            results.push({id:vintage.id, name:vintage.year})
          return results
        }))
      .subscribe((d:any[])=> this.eventsSubject.next(d));
    }
  }
  onVintageAdded(data:any){
    //console.log("onVintageAdded")
    //console.log(data)
    this.wineVintages.push(data.name)
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
