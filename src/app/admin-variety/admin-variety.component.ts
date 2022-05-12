import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Variety } from '../models/Variety';
import { VinomioVarietyService } from '../services/vinomio-variety.service';

@Component({
  selector: 'app-admin-variety',
  templateUrl: './admin-variety.component.html',
  styleUrls: ['./admin-variety.component.css']
})
export class AdminVarietyComponent implements OnInit {

  displayedColumns=['id','name','slug']
  exclusionColumns=[]
  dataSource = new MatTableDataSource<Variety>();
  
  constructor(
    private router:Router,
    private varietyService: VinomioVarietyService
  ) { }

  ngOnInit(): void {
   this.getSourceData()
  }
  private getSourceData(text?:string){
    this.varietyService.get().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    if(wine.action=='view')
    this.router.navigateByUrl('/admin/variety/' + wine.event.id, { state: wine.event });
  else if(wine.action=='delete')
    this.varietyService.delete(wine.event.id).subscribe(() => this.ngOnInit())
  }
}
