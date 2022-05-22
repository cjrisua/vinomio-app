import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { Profile } from 'src/app/models/Profile';
import { Wine } from 'src/app/models/Wine';
import { VinomioAllocationEventOfferService } from 'src/app/services/vinomio-allocation-event-offer.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-cellar-allocation-purchase',
  templateUrl: './cellar-allocation-purchase.component.html',
  styleUrls: ['./cellar-allocation-purchase.component.css'],
})
export class CellarAllocationPurchaseComponent implements OnInit {
  @Input() userProfile!: Profile;
  @Input() allocationEvent!: any;
  @Input() allocation!: any;
  @Output() ItemEvent = new EventEmitter<any>();
  allocationForm!: FormGroup;
  wineOffers: Wine[] = [];
  formats: { id: string; name: string }[] = [
    { id: '750ml', name: '750ml' },
    { id: '1.5L', name: '1.5L' },
  ];
  vintages: { id: number; name: string }[] = [
    {id:0, name:"Select Vintage"},
    {id:2018, name:"2018"},
    {id:2019, name:"2019"},
    {id:2020, name:"2020"},
    {id:2021, name:"2021"},
    {id:2022, name:"2022"},
    {id:2023, name:"2023"},
    {id:2024, name:"2024"},
    {id:2025, name:"2025"},
  ]
  constructor(
    private eventservice: VinomioAllocationEventOfferService,
    @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    //console.log(this.allocationEvent)
    this.allocationForm = new FormGroup({
      offers: new FormArray([]),
      purchaseddate: new FormControl(`${formatDate(Date.now(),'MM/dd/yyyy',this.locale)}`),
      deliverydate: new FormControl(`${formatDate(Date.now(),'MM/dd/yyyy',this.locale)}`),
    });
    //this.allocationForm.patchValue({format:"750ml"})

    if (this.allocationEvent?.id) {
      this.eventservice
        .getByEvent(this.allocationEvent?.id)
        .pipe(
          map((offers) =>
            offers.forEach((o: any) => {
              this.wineOffers.push(o.wine);
              let offerArray = this.allocationForm.get('offers') as FormArray;
              offerArray.push(
                new FormGroup({
                  id: new FormControl(o.wine.id),
                  name: new FormControl(o.wine.name),
                  bottles: new FormControl(o.minimum,[Validators.min(1)]),
                  amount: new FormControl(o.releasePrice,[Validators.min(1)]),
                  formats: new FormControl("750ml"),
                  accepted: new FormControl(false),
                  vintage: new FormControl(0),
                })
              );
            })
          ),
          catchError(() => of([]))
        )
        .subscribe((r) => {
          //console.log(this.wineOffers);
        });
    }
  }
  onAddToOffer(offer:FormControl){
    const status:boolean=offer.get('accepted')?.value || false
    offer.patchValue({accepted: !status})
    offer.get("vintage")?.setValidators(!status ? [Validators.min(1)] : [])
    offer.get("vintage")?.updateValueAndValidity();
  }
  onCancel() {
    this.ItemEvent.emit();
  }
  onSubmit() {
    this.ItemEvent.emit();
  }
  public get offers(){
    let offers = this.allocationForm.get('offers') as FormArray;
    return  offers.controls
  }
}