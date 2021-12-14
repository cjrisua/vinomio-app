import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Vintage } from 'src/app/models/Vintage';

@Component({
  selector: 'app-core-area-textbox',
  templateUrl: './core-area-textbox.component.html',
  styleUrls: ['./core-area-textbox.component.css']
})
export class CoreAreaTextboxComponent implements OnInit {
  
  @Input() item:any  = {}
  @Output() addClicked = new EventEmitter<{id:number,name:string}>();
  @Input() events!: Observable<Vintage[]>;
  private eventsSubscription!: Subscription;
  
  messages:any = []
  constructor() { }

  ngOnInit(): void {
    //console.log("init")
    //console.log(this.messages)
    this.eventsSubscription = this.events.subscribe((d) => this.doSomething(d));
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
  
  onAdd(){
    console.log(this.item)
    if(this.item != null){
      //populate container
      this.messages.push({id: this.item.id, name:this.item.name })
      //emit event 
      this.addClicked.emit({id: this.item.id, name:this.item.name });
    }
  }
  doSomething(data:any){
    console.log(data)
    //clean textarea
    this.messages = []
    for(let i=0; i<Object.values(data).length; i++)
      this.messages.push({id: data[i].id, name:data[i].name })
  }
  onRemove(){
    
    //this.addremoveClicked.emit("removed")
  }
}
