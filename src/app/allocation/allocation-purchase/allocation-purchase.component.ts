import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, EMPTY, filter, map, of } from 'rxjs';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { Collection } from 'src/app/models/Collection';
import { Profile } from 'src/app/models/Profile';
import { Wine } from 'src/app/models/Wine';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioAllocationEventOfferService } from 'src/app/services/vinomio-allocation-event-offer.service';
import { VinomioAllocationService } from 'src/app/services/vinomio-allocation.service';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-allocation-purchase',
  templateUrl: './allocation-purchase.component.html',
  styleUrls: ['./allocation-purchase.component.css'],
})
export class AllocationPurchaseComponent implements OnInit {
  userProfile!: Profile;
  //allocationEvent!: any;
  allocation!: any;
  @Output() ItemEvent = new EventEmitter<any>();
  allocationForm!: FormGroup;
  wineOffers: Wine[] = [];
  formats: { id: string; name: string }[] = [
    { id: '750ml', name: '750ml' },
    { id: '1.5L', name: '1.5L' },
  ];
  vintages: { id: number; name: string }[] = [
    { id: 0, name: 'Select Vintage' },
    { id: 2018, name: '2018' },
    { id: 2019, name: '2019' },
    { id: 2020, name: '2020' },
    { id: 2021, name: '2021' },
    { id: 2022, name: '2022' },
    { id: 2023, name: '2023' },
    { id: 2024, name: '2024' },
    { id: 2025, name: '2025' },
  ];
  constructor(
    private eventservice: VinomioAllocationEventOfferService,
    private allocationService: VinomioAllocationService,
    private collectionService: VinomioCollectionService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.userProfile = this.authService.getCurrentUser();
    this.allocationForm = new FormGroup({
      offers: new FormArray([]),
      purchaseddate: new FormControl(
        `${formatDate(Date.now(), 'MM/dd/yyyy', this.locale)}`
      ),
      deliverydate: new FormControl(
        `${formatDate(Date.now(), 'MM/dd/yyyy', this.locale)}`
      ),
      inmycellar: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      //console.debug(params);
      const regExp: RegExp = /^[0-9]+$/g;
      const regExp2: RegExp = /^[0-9]+$/g;
      console.log('-' + params.get('event') + '-');
      if (
        params.get('event') &&
        regExp.test(params.get('event') || '') &&
        params.get('allocation') &&
        regExp2.test(params.get('allocation') || '')
      ) {
        this.allocationService
          .getById(Number(params.get('allocation')))
          .pipe(
            map((p) => {
              const event = p.events.filter(
                (i: any) => i.id == params.get('event')
              );
              if (event.length > 0) p.events = event[0];
              else p.events = {};
              return p;
            })
          )
          .subscribe((rs) => {
            //console.debug(rs)
            this.allocation = rs;
            rs.events.AllocationEventOffers.forEach((o: any) => {
              //console.debug(o)
              this.wineOffers.push(o.wine);
              let offerArray = this.allocationForm.get('offers') as FormArray;
              offerArray.push(
                new FormGroup({
                  id: new FormControl(o.wine.id),
                  name: new FormControl(o.wine.name),
                  bottles: new FormControl(o.minimum, [Validators.min(1)]),
                  amount: new FormControl(o.releasePrice, [Validators.min(1)]),
                  formats: new FormControl('750ml'),
                  accepted: new FormControl(false),
                  vintage: new FormControl(0),
                })
              );
            });
          });
        /*
        this.eventservice
          .getByEvent(params.get('event'))
          .pipe(
            map((offers) =>
              offers.forEach((o: any) => {
                console.debug(o)
                this.wineOffers.push(o.wine);
                let offerArray = this.allocationForm.get('offers') as FormArray;
                offerArray.push(
                  new FormGroup({
                    id: new FormControl(o.wine.id),
                    name: new FormControl(o.wine.name),
                    bottles: new FormControl(o.minimum, [Validators.min(1)]),
                    amount: new FormControl(o.releasePrice, [
                      Validators.min(1),
                    ]),
                    formats: new FormControl('750ml'),
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
          });*/
      } //
    });
  }
  onAddToOffer(offer: FormControl) {
    const status: boolean = offer.get('accepted')?.value || false;
    offer.patchValue({ accepted: !status });
    offer.get('vintage')?.setValidators(!status ? [Validators.min(1)] : []);
    offer.get('vintage')?.updateValueAndValidity();
  }
  onCancel() {
    this.ItemEvent.emit();
  }
  onSubmit() {
    //console.log(this.offers)
    //type: DataTypes.ENUM('allocated','pending','drunk','deleted'),
    const data: Collection[] = this.offers
      .filter((i: any) => i.value.accepted)
      .map((item: any) => {
        return {
          wineId: item.value.id,
          vintage: item.value.vintage,
          cellarId: this.userProfile.cellar,
          price: item.value.amount,
          bottleCount: item.value.bottles,
          bottleSize: item.value.formats,
          bottleLocation: [],
          acquiringSourceId: this.allocation.merchant.id,
          merchant:this.allocation.merchant,
          allocationEventId: this.allocation.events.id,
          purchasedOn: this.allocationForm.value.purchaseddate,
          deliverBy: this.allocationForm.value.deliverydate,
          statusId: this.allocationForm.value.inmycellar
            ? 'allocated'
            : 'pending',
        };
      });
    //console.log(data)
    if (data.length > 0) {
      this.collectionService
        .add(data)
        .pipe(
          catchError((err) => {
            console.debug(err);
            return EMPTY;
          })
        )
        .subscribe((resp) => {
          //console.log(resp);
          if (resp.status == 201) {
            this.router.navigate(['/allocation/mailing'], {
              queryParams: { action: 'List' },
            });
          }
        });
    }
  }
  public updateStatus() {
    this.allocationForm.patchValue({
      inmycellar: !this.allocationForm.value.inmycellar,
    });
  }
  public get offers() {
    let offers = this.allocationForm.get('offers') as FormArray;
    return offers.controls;
  }
}
