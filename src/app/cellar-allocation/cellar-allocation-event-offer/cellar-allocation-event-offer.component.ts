import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-cellar-allocation-event-offer',
  templateUrl: './cellar-allocation-event-offer.component.html',
  styleUrls: ['./cellar-allocation-event-offer.component.css']
})
export class CellarAllocationEventOfferComponent implements OnInit {
  @Input() wineItem:any
  @Output() deleteItemEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    //console.log(this.offer)
  }
  onDelete(item:any){
    console.log("emit event....")
    this.deleteItemEvent.emit(item);
  }
}
