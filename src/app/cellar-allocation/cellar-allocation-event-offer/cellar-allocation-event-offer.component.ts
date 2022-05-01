import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-cellar-allocation-event-offer',
  templateUrl: './cellar-allocation-event-offer.component.html',
  styleUrls: ['./cellar-allocation-event-offer.component.css']
})
export class CellarAllocationEventOfferComponent implements OnInit {
  @Input()wineItem!: { id: number; name:string; price: number; };
  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() setPriceEvent = new EventEmitter<{id:number, price:number}>();

  constructor() { }

  ngOnInit(): void {
    //console.log(this.wineItem)
  }
  onDelete(item:any){
    //console.log("emit event....")
    this.deleteItemEvent.emit(item);
  }
  onKeyUp(event:any){
    const price:string = event.target.innerText
    if(price.match(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/)){
      this.setPriceEvent.emit(
        {
          id:this.wineItem.id,
          price:event.target.innerText
        })
    }

  }
}
