import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-core-area-textbox',
  templateUrl: './core-area-textbox.component.html',
  styleUrls: ['./core-area-textbox.component.css']
})
export class CoreAreaTextboxComponent implements OnInit {
  
  @Input() item!:{id:number,name:string}
  @Input() allowDuplictes = false
  @Output() addOrRemovedClicked = new EventEmitter<{status:string ,id:number,name:string}>();
  @Input() events!: Observable<{id:number,name:string}[]>;
  private eventsSubscription!: Subscription;
  selectedItem:any={}
  private slugify = (str: string): string => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  messages!:{id:number,name:string}[]

  constructor() { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((d) => this.initTextArea(d));
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
  
  onAdd(){
    
    console.log(this.item)
    console.log(this.messages)
    if(this.item != null && !this.allowDuplictes && this.messages != null && !this.messages.some(i=> this.slugify(i.name) == this.slugify(this.item.name))){
      //populate container
      //console.log(this.messages)
      this.messages.push({id: this.item.id, name:this.item.name })
      //emit event 
      this.addOrRemovedClicked.emit({status:'added', id: this.item.id, name:this.item.name });
    }
    else
      console.debug("items already exits")
  }
  initTextArea(data:any){
    this.messages = []
    for(let i=0; i<Object.values(data).length; i++)
      this.messages.push({id: data[i].id, name:data[i].name })
  }
  onRemove(selectedItem:any){
    this.messages = this.messages.filter((i:any) => i !== selectedItem)
    this.addOrRemovedClicked.emit({status:'removed', id: this.selectedItem.id, name:this.selectedItem.name });
  }
  onSelect(item:any){
    this.selectedItem = item;
  }
}
