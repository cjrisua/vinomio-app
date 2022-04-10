import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { Merchant } from 'src/app/models/Merchant';
import { Profile } from 'src/app/models/Profile';
import { VinomioMerchantService } from 'src/app/services/vinomio-merchant.service';

@Component({
  selector: 'app-cellar-merchant-form',
  templateUrl: './cellar-merchant-form.component.html',
  styleUrls: ['./cellar-merchant-form.component.css']
})
export class CellarMerchantFormComponent implements OnInit {
  @Input() userProfile!: Profile;
  @Output() ItemEvent = new EventEmitter<any>();
  submitted = false;
  merchantForm!: FormGroup;
  merchants!: Merchant[];
  search!: OperatorFunction<string, readonly Merchant[]>

  constructor(
    private merchantService: VinomioMerchantService
  ) { }

  ngOnInit(): void {
    this.merchantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      userId: new FormControl(this.userProfile.id),
    });
  }
  onCancel() {
    this.EmitEvent({action:'cancel'});
    //this.addMerchant();
  }
  EmitEvent(message: any = {}) {
    this.ItemEvent.emit(message);
  }
  resultFormatListValue(value: any) {            
    return value.name;
  }
  onMerchantSelection(selection:any){
    
  }
  /*
  _serviceMerchantSearch(keyword:string){
    //let results:string [] = []
    this.merchantService
    .get(this.userProfile.id,keyword)
    .subscribe( merchants => results=merchants.map(p => p.name ))

  }*/
  onFilterMerchantList(){
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => { 
        let matches: any[] = []
        
        if (!term.startsWith("@")) return []
       
        if(term.length > 1){
          this.merchantService
                  .get(this.userProfile.id,term.replace("@",""))
                  .subscribe( merchants => { this.merchants =  merchants.filter(p => p.name?.startsWith(term.replace("@",""))) })
        }
        return this.merchants 
      }),
      map( m => { console.log(m); return m})
      );
  }
  inputFormatListValue(value: any)   {
    if(value.name)
      return value.name
    return value;
  }
  onSubmit() {
    
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
}
