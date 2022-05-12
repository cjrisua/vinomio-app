import { Component, OnInit } from '@angular/core';
import { VinomioProducerService } from '../services/vinomio-producer.service';
import {MatTableDataSource} from "@angular/material/table";
import { Producer } from '../models/Producer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-producers',
  templateUrl: './admin-producers.component.html',
  styleUrls: ['./admin-producers.component.css']
})
export class AdminProducersComponent implements OnInit {

  producers: Producer[] = [];
  exclusionColumns=[]
  dataSource = new MatTableDataSource<Producer>();

  constructor(
    private producerService: VinomioProducerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getSourceData()
  }

  private getSourceData(text?:string){
    this.producerService.get(text).subscribe((data) => {
      //this.producers = data;
      this.dataSource.data = data;
    });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    //console.log(`naviage to id ${JSON.stringify(wine.event)}`);
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/producer/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.producerService.delete(wine.event.id).subscribe(() => this.ngOnInit())
  }
}
