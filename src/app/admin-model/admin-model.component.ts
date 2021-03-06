import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MODEL } from '../app.module';

@Component({
  selector: 'app-admin-model',
  templateUrl: './admin-model.component.html',
  styleUrls: ['./admin-model.component.css']
})

export class AdminModelComponent implements OnInit {

  targetModelName!: MODEL;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.targetModelName = params['name'];
    });
  }
  public get Model() {
    return MODEL; 
  }
}
