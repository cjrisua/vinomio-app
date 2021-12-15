import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vintage } from '../models/Vintage';
import { VinomioVintageService } from '../services/vinomio-vintage.service';

@Component({
  selector: 'app-admin-vintage',
  templateUrl: './admin-vintage.component.html',
  styleUrls: ['./admin-vintage.component.css']
})
export class AdminVintageComponent implements OnInit {
  displayedColumns=['id','year','Wine.name']
  dataSource = new MatTableDataSource<Vintage>();
  constructor(
    private vintageService: VinomioVintageService
  ) { }

  ngOnInit(): void {
    this.vintageService.get().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

}
