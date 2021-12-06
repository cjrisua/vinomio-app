import { Component, OnInit } from '@angular/core';
import { VinomioProducerService } from '../services/vinomio-producer.service';

@Component({
  selector: 'app-admin-producers',
  templateUrl: './admin-producers.component.html',
  styleUrls: ['./admin-producers.component.css']
})
export class AdminProducersComponent implements OnInit {

  producers: any;
  constructor(private producerService: VinomioProducerService) { }

  ngOnInit(): void {
    this.producerService.getAll().subscribe(data => {
        this.producers =data;
      });
  }

}
