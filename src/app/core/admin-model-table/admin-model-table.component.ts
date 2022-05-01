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
  @Output() viewDetailsEvent = new EventEmitter<number>();
  //exclusionColumns:string[]=['name']
  
  constructor() { }

  ngOnInit(): void {
    this.exclusionColumns.push('name')
  }
  public displayColumn(item:string){
    return !this.exclusionColumns.includes(item)
  }
  public onViewItem(event:any){
    this.viewDetailsEvent.emit(event)
  }

}
