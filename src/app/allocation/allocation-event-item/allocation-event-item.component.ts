import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { VinomioAllocationEventService } from 'src/app/services/vinomio-allocation-event.service';

@Component({
  selector: 'app-allocation-event-item',
  templateUrl: './allocation-event-item.component.html',
  styleUrls: ['./allocation-event-item.component.css']
})
export class AllocationEventItemComponent implements OnInit {

  @Input() event:any
  @ViewChildren('eventname') eventName!:QueryList<any>;
  @ViewChildren('eventmonth') eventMonth!:QueryList<any>;
  contenteditable:boolean = false

  constructor(
    private aeService:VinomioAllocationEventService
  ) { }

  ngOnInit(): void {
  }

  styleObject(): Object {
    if (this.contenteditable){
        return {'border': 'groove','border-radius': '4px'}
    }
    return {}
  }
  onEditSave(event:any,data:any){
    if(this.contenteditable){
      const name = (<HTMLElement>this.eventName.first.nativeElement).innerHTML;
      const month = (<HTMLElement>this.eventMonth.first.nativeElement).innerHTML;
      const payload = {name:name, month:month}
      this.aeService.put(data.eventId,payload).subscribe((result)=>console.log("done!"))
    }
    this.contenteditable = !this.contenteditable
  }

}
