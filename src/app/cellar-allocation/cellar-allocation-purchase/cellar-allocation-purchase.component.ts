import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { Profile } from 'src/app/models/Profile';
import { Wine } from 'src/app/models/Wine';
import { VinomioAllocationEventOfferService } from 'src/app/services/vinomio-allocation-event-offer.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-cellar-allocation-purchase',
  templateUrl: './cellar-allocation-purchase.component.html',
  styleUrls: ['./cellar-allocation-purchase.component.css']
})
export class CellarAllocationPurchaseComponent implements OnInit {

  @Input() userProfile!: Profile;
  @Input() allocationEvent!:any
  @Output() ItemEvent = new EventEmitter<any>();
  allocationForm!: FormGroup;
  wineOffers:Wine[] = []
  
  constructor(
    private eventservice: VinomioAllocationEventOfferService
  ) { }

  ngOnInit(): void {
    console.log(this.allocationEvent)
    this.allocationForm = new FormGroup({})

    if(this.allocationEvent?.id){
      this.eventservice.getByEvent(this.allocationEvent?.id)
        .pipe(
          map((offers) => offers.forEach((o:any) => this.wineOffers.push(o.wine))),
          catchError(()=> of([]))
        ).subscribe((r) => r);
    }
    
  }
  private getEventOffers(eventid:number){
    
  }
  onCancel() {
    this.ItemEvent.emit();
  }
  onSubmit() {
    this.ItemEvent.emit();
  }

}
