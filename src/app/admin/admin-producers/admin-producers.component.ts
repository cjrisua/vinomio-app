import { Component, OnInit } from '@angular/core';
import { VinomioProducerService } from '../../services/vinomio-producer.service';
import {MatTableDataSource} from "@angular/material/table";
import { Producer } from '../../models/Producer';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-producers',
  templateUrl: './admin-producers.component.html',
  styleUrls: ['./admin-producers.component.css']
})
export class AdminProducersComponent implements OnInit {

  modelName = "Producer"
  producers: Producer[] = [];
  exclusionColumns=[]
  dataSource = new MatTableDataSource<Producer>();
  model$!: Observable<any>
  clearForm = new Subject()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private producerService: VinomioProducerService) { 
      this.model$ = this.producerService.get()
      .pipe(
        map((data:any[])=> this.dataSource.data = data),
        map(()=>this.modelName),
        catchError(()=>of([]))
      )
    }

  ngOnInit(): void {
    //console.debug("AdminProducersComponent [ngOnInit()]")
    //this.getSourceData()
  }

  private getSourceData(text?:string){
    this.producerService.get(text)
    .pipe(
      catchError(()=>of([]))
    )
    .subscribe((data) => {
      //this.producers = data;
      this.dataSource.data = data;
    });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    //console.log(`naviage to id ${JSON.stringify(wine)}`);
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/producer/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete'){
      this.producerService.delete(wine.event.id).subscribe(() => {
        this.clearForm.next('')
        this.getSourceData()
      })
    }
      //
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.producerService.count}
  }
}
