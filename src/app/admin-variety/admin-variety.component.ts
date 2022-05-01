import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
    private varietyService: VinomioVarietyService
  ) { }

  ngOnInit(): void {
    this.varietyService.get().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

}
