import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

export interface Offer{
  id?:number;
  price?:number;
  name?:string;
  minimum?:number
}

@Component({
  selector: 'app-allocation-event-offer',
  templateUrl: './allocation-event-offer.component.html',
  styleUrls: ['./allocation-event-offer.component.css']
})
export class AllocationEventOfferComponent implements OnInit {
  
  @Input()  wineItem!:Offer
  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() setPriceEvent = new EventEmitter<Offer>();
  subject: Subject<any> = new Subject();
  offerPrice!:number
  offerMinimal!:string 
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.wineItem)
    if(this.wineItem.price)
      this.offerPrice = this.wineItem.price
   
    this.subject
    .pipe(debounceTime(500))
    .subscribe(() => {
          this.setPriceEvent.emit(this.wineItem)
        }
    );
  }
  onDelete(item:any){
    this.deleteItemEvent.emit(item);
  }
  setOfferMin(){
    this.wineItem.minimum = 3
    this.setPriceEvent.emit(this.wineItem)
  }
  public price(event:any){
    console.log(event)
    return this.wineItem.price
  }
  onMinimumKeyUp(event:any){
    const minimum:string = event.target.innerText
    if(minimum.match(/^[0-9]{1}$/)){
      this.wineItem.minimum = Number(minimum)
      this.subject.next('');
    }
  }
  onPriceKeyUp(event:any){
    const price:string = event.target.innerText
    if(price.match(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/)){
      this.wineItem.price = Number(price)
      this.subject.next('');
    }
  }
}
