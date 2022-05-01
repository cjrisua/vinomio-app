import { Component, OnInit } from '@angular/core';
import { VinomioAllocationEventService } from 'src/app/services/vinomio-allocation-event.service';

@Component({
  selector: 'app-cellar-allocation-event',
  templateUrl: './cellar-allocation-event.component.html',
  styleUrls: ['./cellar-allocation-event.component.css']
})
export class CellarAllocationEventComponent implements OnInit {

  MerchantId!:number
  events:any

  constructor(
    private allocationEvent: VinomioAllocationEventService
  ) { }

  ngOnInit(): void {
    this.allocationEvent.get(this.MerchantId).subscribe((results) =>{
      //console.debug(results)
      this.events = results
    })
  }

}
