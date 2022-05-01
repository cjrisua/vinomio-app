import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from '../models/Country';
import { VinomioCountryService } from '../services/vinomio-country.service';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.css']
})
export class AdminCountryComponent implements OnInit {

  displayedColumns=['id','name','slug']
  exclusionColumns=[]
  dataSource = new MatTableDataSource<Country>();

  constructor(
    private countryService: VinomioCountryService
  ) { }

  ngOnInit(): void {
    this.countryService.get().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

}
