import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-core-area-textbox',
  templateUrl: './core-area-textbox.component.html',
  styleUrls: ['./core-area-textbox.component.css']
})
export class CoreAreaTextboxComponent implements OnInit {
  
  @Input() item  = {}

  constructor() { }

  ngOnInit(): void {
  }
  onAdd(){
    console.log(this.item)
    console.log('add clicked')
  }
  onRemove(){
    console.log("remove clicked")
  }
}
