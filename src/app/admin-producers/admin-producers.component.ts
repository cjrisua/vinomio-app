import { Component, OnInit } from '@angular/core';
import { VinomioProducerService } from '../services/vinomio-producer.service';
import {MatTableDataSource} from "@angular/material/table";
import { Producer } from '../models/Producer';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-producers',
  templateUrl: './admin-producers.component.html',
  styleUrls: ['./admin-producers.component.css']
})
export class AdminProducersComponent implements OnInit {

  producers: Producer[] = [];
  displayedColumns=['id','name','slug']
  dataSource = new MatTableDataSource<Producer>();

  constructor(private producerService: VinomioProducerService) { }

  ngOnInit(): void {
    this.producerService.getAll().subscribe((data) => {
        //this.producers = data;
        this.dataSource.data = data;
        //console.log(data);
      });
  }

}
