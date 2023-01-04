import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Producer } from 'src/app/models/Producer';
import { Wine } from 'src/app/models/Wine';

@Component({
  selector: 'app-admin-model-table',
  templateUrl: './admin-model-table.component.html',
  styleUrls: ['./admin-model-table.component.css']
})
export class AdminModelTableComponent implements OnInit {

  @Input() ModelItems:any
  @Input() exclusionColumns:string[] =[]
  @Input() attributes:any=[]
  @Output() viewOrdeleteEvent = new EventEmitter<{action:string,event:any}>();
  @Output() routeEvent = new EventEmitter<{action:string,sender:string,data:any}>();
  
  constructor() { 
   
  }

  ngOnInit(): void {
    this.exclusionColumns.push('name')
  }
  public displayColumn(item:string){
    return !this.exclusionColumns.includes(item)
  }
  public onViewItem(event:any){
    this.viewOrdeleteEvent.emit({action:'view',event:event,})
  }
  public isObject(object:any){
    return !(object instanceof Object)
  }
  public onDelete(event:any){
    this.viewOrdeleteEvent.emit({action:'delete',event:event})
  }
  public getType(columnName:string) : string{
    const data = this.attributes.find((i:any) => i.column.name == columnName)
    return data ? data.column.type : "" 
  }
  public onRouteEvent(sender:any,data:any){
    this.routeEvent.emit({action:"routeLink", sender:sender, data:data})
  }
}
