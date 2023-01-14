import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, EMPTY, map } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';

@Component({
  selector: 'app-cellar-wine-allocation-delete',
  templateUrl: './cellar-wine-allocation-delete.component.html',
  styleUrls: ['./cellar-wine-allocation-delete.component.css']
})
export class CellarWineAllocationDeleteComponent implements OnInit {

  @Input() currentUser!:Profile
  @Input() collectionId!:any
  @Input() wine!:any
  @Output() actionEvent =  new EventEmitter<{}>();
  submitted:boolean = false
  itemForm!: FormGroup;

  
  constructor(
    private collectionService: VinomioCollectionService
  ) { }

  ngOnInit(): void {
    this.itemForm = new FormGroup({})
  }
  onNavigateBack(){
    //console.log("onNavigateBack")
    this.actionEvent.emit({})
  }
  onSubmit() { 
    this.collectionService.delete(this.collectionId).pipe(
      map((p:any)=> p),
      catchError(()=>EMPTY)
    ).subscribe((e)=>{
      //console.debug("onSubmit")
      this.wine = this.wine.filter((p:any)=> p.id !== this.collectionId)
      this.actionEvent.emit({id:"touched",data:this.wine})
    })
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
