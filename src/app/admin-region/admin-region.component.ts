import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Region } from '../models/Region';
import { VinomioRegionService } from '../services/vinomio-region.service';

@Component({
  selector: 'app-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent implements OnInit {

  //wines!: Region[];
  displayedColumns=['id','name','slug','terroir']
  dataSource = new MatTableDataSource<Region>();

  constructor(
    private regionService:VinomioRegionService
    ) { }

  ngOnInit(): void {
    this.regionService.get(true).subscribe(data => {
      this.dataSource.data = data;
      });
  }

}
