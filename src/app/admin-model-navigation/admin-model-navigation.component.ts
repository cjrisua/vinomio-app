import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MODEL } from '../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-model-navigation',
  templateUrl: './admin-model-navigation.component.html',
  styleUrls: ['./admin-model-navigation.component.css']
})
export class AdminModelNavigationComponent implements OnInit {

  @Input() model!: MODEL;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  modelActionAdd(model:MODEL):void{
    if(model == MODEL.Producer)
    {

    }
  }
}
