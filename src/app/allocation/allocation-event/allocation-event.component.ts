import { Component, OnInit } from '@angular/core';
import { VinomioAllocationEventService } from 'src/app/services/vinomio-allocation-event.service';

@Component({
  selector: 'app-allocation-event',
  templateUrl: './allocation-event.component.html',
  styleUrls: ['./allocation-event.component.css']
})
export class AllocationEventComponent implements OnInit {

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
