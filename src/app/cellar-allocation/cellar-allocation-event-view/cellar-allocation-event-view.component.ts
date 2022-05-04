import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
} from 'rxjs';
import { Allocation } from 'src/app/models/Allocation';
import { AllocationEvent } from 'src/app/models/AllocationEvent';
import { AllocationEventOffer } from 'src/app/models/AllocationEventOffer';
import { Merchant } from 'src/app/models/Merchant';
import { Wine } from 'src/app/models/Wine';
import { VinomioAllocationEventOfferService } from 'src/app/services/vinomio-allocation-event-offer.service';
import { VinomioAllocationEventService } from 'src/app/services/vinomio-allocation-event.service';
import { VinomioWineService } from 'src/app/services/vinomio-wine.service';

@Component({
  selector: 'app-cellar-allocation-event-view',
  templateUrl: './cellar-allocation-event-view.component.html',
  styleUrls: ['./cellar-allocation-event-view.component.css'],
})
export class CellarAllocationEventViewComponent implements OnInit {
  @Input() allocation!: Allocation;
  @Output() ItemEvent = new EventEmitter<any>();

  searchControl!: FormControl;
  eventForm!: FormGroup;

  search!: OperatorFunction<string, readonly Wine[]>;
  totalCount: number = 0;
  wines: Wine[] = [];
  wineSelection!: Wine;
  isreadonly: boolean = true;
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  offerBottle: { id: number; name: string; price: number }[] = [];
  offerBottleReleasePrices: { id: number; price: number }[] = [];
  event: any;
  @ViewChildren('releasePrice') releasePrice!: QueryList<any>;

  constructor(
    private wineService: VinomioWineService,
    private eventService: VinomioAllocationEventService,
    private eventOfferService: VinomioAllocationEventOfferService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    //console.log(this.allocation)
    this.event = this.allocation.events || [];

    this.searchControl = new FormControl();
    this.eventForm = new FormGroup({
      id: new FormControl(this.event[0].id),
      name: new FormControl(this.event[0].name),
      month: new FormControl(),
    });
    this.eventForm.controls['month'].setValue(this.event[0].month, {
      onlySelf: true,
    });
    this.getEventOffers(this.eventForm.value.id);
    this.wineService
      .get(this.allocation.merchant?.producerId)
      .subscribe((res) => {
        if (res.length > 0) {
          this.search = (text$: Observable<string>) =>
            text$.pipe(
              debounceTime(200),
              distinctUntilChanged(),
              map((term) =>
                term.length < 1
                  ? []
                  : res
                      .filter(
                        (v) =>
                          v.name &&
                          !this.isPartOfOffer(v) &&
                          v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
                      )
                      .slice(0, 10)
              )
            );
        }
      });
  }
  private getEventOffers(eventid: any) {
    console.log(`getEventOffers: ${eventid}`);
    this.eventOfferService.getByEvent(eventid).subscribe((res) => {
      console.log('eventOfferService...');
      res.map((i: any) => {
        if (i.wine) {
          const wine = {
            id: i.wine.id || 0,
            name: i.wine.name || '',
            price: i.releasePrice || 0,
          };
          this.offerBottle.push(wine);
        }
      });
    });
  }
  private isPartOfOffer(item: any) {
    return this.offerBottle.some((p) => p.id == item.id);
  }
  public get Event(): AllocationEvent {
    return this.allocation.events
      ? this.allocation.events[0]
      : new AllocationEvent();
  }
  resultFormatListValue(value: any) {
    return value.name;
  }
  inputFormatListValue(value: any) {
    if (value.name) return value.name;
    return value;
  }
  onEditForm() {
    this.isreadonly = !this.isreadonly;
  }
  onSearchSelection(selection: any) {
    this.offerBottle.push(selection.item);
  }
  removalOfferEvent(item: any) {
    this.offerBottle = this.offerBottle.filter((p: any) => p.id != item.id);
  }
  onFilterList() {}
  onClear() {
    //this.ngOnInit();
    this.searchControl = new FormControl();
  }
  onCancel() {
    this.ItemEvent.emit();
  }
  setPriceUpdate(event: any) {
    console.debug(`setPriceUpdate: ${JSON.stringify(event)}`);

    if (!this.offerBottleReleasePrices.some((p) => p.id == event.id)) {
      console.debug('adding');
      this.offerBottleReleasePrices.push(event);
    } else {
      console.debug('update');
      this.offerBottleReleasePrices
        .filter((p) => p.id == event.id)
        .map((p) => (p.price = event.price));
    }
    console.debug(this.offerBottleReleasePrices);
  }
  onSubmit() {
    const mergeById = (array1: any[], array2: any[]) =>
      array1.map((itm) => ({
        ...array2.find((item) => item.id === itm.id && item),
        ...itm,
      }));

    const merged = mergeById(this.offerBottle, this.offerBottleReleasePrices);
    console.log(merged)

    if (this.eventForm.touched) {
      const data: { name: string; month: string } = {
        name: this.eventForm.value.name,
        month: this.eventForm.value.month,
      };
      this.eventService
        .put(this.eventForm.value.id, data)
        .subscribe(() => console.debug('done!'));
    }

    this.eventOfferService
      .add(
        this.offerBottleReleasePrices.map((m) => {
          console.debug(m)
          return {
            allocationEventId: this.eventForm.value.id,
            wineId: m.id,
            releasePrice: Number(m.price),
          };
        })
      )
      .subscribe((r) => { console.debug('done'); this.ItemEvent.emit();});
  }
}
