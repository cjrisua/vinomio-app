import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MODEL } from '../../app.module';
//import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-model-navigation',
  templateUrl: './admin-model-navigation.component.html',
  styleUrls: ['./admin-model-navigation.component.css']
})
export class AdminModelNavigationComponent implements OnInit {

  @Input() model!: MODEL;
  @Output() newItemEvent = new EventEmitter<void>();

  
  constructor(
    //private router: Router,
    
    ) { }

  ngOnInit(): void {
    
  }

  GoBackEvent() {
    this.newItemEvent.emit();
  }
}
