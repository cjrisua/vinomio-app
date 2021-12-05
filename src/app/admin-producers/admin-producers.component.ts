import { Component, OnInit } from '@angular/core';
import { VinomioService } from '../vinomio.service';

@Component({
  selector: 'app-admin-producers',
  templateUrl: './admin-producers.component.html',
  styleUrls: ['./admin-producers.component.css']
})
export class AdminProducersComponent implements OnInit {

  producers: any  = [];
  constructor(private vinomioService: VinomioService) { }

  ngOnInit(): void {
    this.vinomioService.sendGetRequest('producer').subscribe(data => {
        this.producers =data;
      });
  }

}
